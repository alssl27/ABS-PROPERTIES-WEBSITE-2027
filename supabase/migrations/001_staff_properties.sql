-- Run once in a new Supabase project's SQL editor. No sample users or properties.
create table public.staff (
 id uuid primary key references auth.users(id) on delete cascade,
 role text not null check (role in ('ADMIN','MANAGER','EDITOR','VIEWER')),
 active boolean not null default true
);
alter table public.staff enable row level security;
create policy staff_self on public.staff for select to authenticated using (id = auth.uid());
create function public.staff_role() returns text language sql stable security definer set search_path = '' as $$
 select role from public.staff where id = auth.uid() and active;
$$;
revoke all on function public.staff_role() from public;
grant execute on function public.staff_role() to anon, authenticated;
create table public.properties (
 id uuid primary key default gen_random_uuid(), reference text not null unique,
 title text not null, listing_type text not null check (listing_type in ('rent','sale')),
 category text not null check (category in ('Residential','Commercial')),
 property_type text not null, status text not null default 'Draft' check (status in ('Draft','Available','For Sale','Let Agreed','Let','Sold STC','Sold','Archived')),
 address_line1 text not null, address_line2 text not null default '', area text not null default '', town text not null, postcode text not null,
 latitude numeric check (latitude between -90 and 90), longitude numeric check (longitude between -180 and 180),
 price numeric(14,2) not null check (price > 0), price_unit text not null check (price_unit in ('pcm','pw','sale')), price_qualifier text not null default '',
 deposit numeric(14,2) check (deposit >= 0), holding_deposit numeric(14,2) check (holding_deposit >= 0),
 bedrooms integer not null check (bedrooms between 0 and 100), bathrooms integer not null check (bathrooms between 0 and 100), reception_rooms integer not null default 0 check (reception_rooms between 0 and 100),
 furnishing text not null default '', available_date date, minimum_tenancy text not null default '', council_tax text not null default '', epc text not null default '',
 summary text not null default '', description text not null default '', features text[] not null default '{}', images text[] not null default '{}',
 floorplan text not null default '', brochure text not null default '', featured boolean not null default false,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 created_by uuid references auth.users(id), updated_by uuid references auth.users(id),
 check ((listing_type = 'sale') = (price_unit = 'sale')),
 check (status in ('Draft','Archived') or (length(description) >= 30 and cardinality(images) > 0)),
 check (cardinality(images) <= 30),
 check ((listing_type = 'rent' and status not in ('For Sale','Sold STC','Sold')) or (listing_type = 'sale' and status not in ('Available','Let Agreed','Let')))
);
create index properties_search on public.properties(status, listing_type, category, price);
alter table public.properties enable row level security;
create policy public_listings on public.properties for select to anon, authenticated using (status not in ('Draft','Archived'));
create policy staff_read on public.properties for select to authenticated using (public.staff_role() is not null);
create policy staff_insert on public.properties for insert to authenticated with check (public.staff_role() in ('ADMIN','MANAGER','EDITOR'));
create policy staff_update on public.properties for update to authenticated using (public.staff_role() in ('ADMIN','MANAGER','EDITOR')) with check (public.staff_role() in ('ADMIN','MANAGER','EDITOR'));
-- Archive is the supported removal workflow; there is deliberately no DELETE policy.
create function public.audit_property() returns trigger language plpgsql set search_path = '' as $$
begin
 if TG_OP = 'INSERT' then new.created_at = now(); new.created_by = auth.uid();
 else new.created_at = old.created_at; new.created_by = old.created_by; end if;
 new.updated_at = now(); new.updated_by = auth.uid(); return new;
end;
$$;
create trigger property_audit before insert or update on public.properties for each row execute function public.audit_property();
insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types)
values ('property-images','property-images',false,8388608,array['image/webp']);
create policy image_read on storage.objects for select to anon, authenticated using (
 bucket_id = 'property-images' and (public.staff_role() is not null or exists (
 select 1 from public.properties p where p.status not in ('Draft','Archived') and storage.objects.name = any(p.images)
 ))
);
create policy image_insert on storage.objects for insert to authenticated with check (
 bucket_id = 'property-images' and public.staff_role() in ('ADMIN','MANAGER','EDITOR') and (storage.foldername(name))[1] = auth.uid()::text
);
create table public.enquiries (
 id uuid primary key default gen_random_uuid(), name text not null, email text not null,
 topic text not null, property text not null default '', message text not null,
 created_at timestamptz not null default now(), status text not null default 'New'
);
alter table public.enquiries enable row level security;
create policy enquiries_staff on public.enquiries for select to authenticated using (public.staff_role() is not null);
-- Only the server service role inserts enquiries after CAPTCHA verification.
grant select on public.staff to authenticated;
grant select, insert, update on public.properties to authenticated;
grant select on public.properties to anon;
grant select on public.enquiries to authenticated;
grant insert on public.enquiries to service_role;
