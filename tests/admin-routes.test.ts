import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

test("admin dashboard points to an existing integrations route", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "src/app/admin/page.tsx"),
    "utf8",
  );

  assert.match(source, /href="\/admin\/settings"/);
  assert.doesNotMatch(source, /href="\/admin\/integrations"/);
});
