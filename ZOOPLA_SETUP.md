# Zoopla setup

## Current implementation status

This project includes a provider-neutral integration abstraction, a Zoopla mapper, a sync queue model and a secure admin settings screen. The live remote upload is intentionally not enabled unless ABS Properties has a valid Zoopla feed approval and credentials.

## What is implemented

- Provider-neutral integration module at `src/lib/integrations/zoopla.ts`
- Admin settings screen at `/admin/settings`
- Integration status output for `Not Configured`, `Configured`, `Connected` and `Error`
- Sync job model for `CREATE`, `UPDATE`, `WITHDRAW` and `DELETE`
- Property-to-Zoopla mapping layer
- Placeholder environment variables for future secure configuration

## Information ABS must request from Zoopla

ABS Properties must request and confirm the following from Zoopla before any live remote feed is enabled:

1. Approved feed or real-time listing contract and account status
2. Branch ID or equivalent account identifier
3. Client ID and any required secret or certificate reference
4. Exact authorised endpoint or API transport specification
5. Property status mapping rules for sale and rental listings
6. Image and document requirements, file size and naming constraints
7. Rate limit, retry and failure-handling requirements
8. Feed approval for updates, withdrawals and deletion flows

## Where credentials are stored

Server-side environment variables must be used. Do not add secrets to `NEXT_PUBLIC_*` variables or to browser JavaScript. Example placeholders are:

- `ZOOPLA_CLIENT_ID`
- `ZOOPLA_CLIENT_SECRET`
- `ZOOPLA_BRANCH_ID`
- `ZOOPLA_FEED_URL`
- `ZOOPLA_CERTIFICATE_REFERENCE`
- `ZOOPLA_ENVIRONMENT`

## How to enable the integration

1. Confirm legal access and documentation from Zoopla.
2. Add the approved variables to the deployment environment.
3. Set `ZOOPLA_ENVIRONMENT` to the correct sandbox or live value.
4. Validate the property mapper against actual approved feed fields.
5. Activate the server-side sync service and monitor job status.

## Testing guidance

Use a sandbox or non-live dataset before a production switch. Validate:

- create listing
- update price/status
- update description
- sync failed states
- withdrawal behaviour
- duplicate prevention

## Safe disable and revoke process

1. Disable the integration flag in the deployment environment.
2. Stop queuing new jobs.
3. Withdraw any live listings from the provider using the approved workflow.
4. Revoke credentials through the secure provider channel.
5. Review audit logs and ensure no live property is accidentally removed from the ABS website.
