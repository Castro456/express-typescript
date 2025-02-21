Sure! Here’s a **copy-paste-friendly** guide with **examples** for each TypeORM command.  

---

# **🚀 TypeORM Migration Commands Cheat Sheet**
**(For Express + TypeScript + PostgreSQL)**  

👉 **Make sure you have added these scripts in `package.json`**:
```json
"scripts": {
  "typeorm": "npx typeorm-ts-node-commonjs",
  "migration:generate": "npm run typeorm -- migration:generate -d ./app/data-source.ts",
  "migration:run": "npm run typeorm -- migration:run -d ./app/data-source.ts",
  "migration:revert": "npm run typeorm -- migration:revert -d ./app/data-source.ts",
  "schema:sync": "npm run typeorm -- schema:sync -d ./app/data-source.ts",
  "migration:show": "npm run typeorm -- migration:show -d ./app/data-source.ts",
  "migration:create": "npm run typeorm -- migration:create ./app/migration/NewMigrationFile"
}
```
---
## **1️⃣ Generate a Migration (Auto-create migration file)**
```sh
npm run migration:generate -- ./app/migration/CreateUsersTable
```
📌 **Example:**  
If you change an entity (e.g., add a `role` column to `Users`), this command **creates a migration file** with the necessary SQL.  

🔹 **Generated file:** `app/migration/1700000000000-CreateUsersTable.ts`

---

## **2️⃣ Run Migrations (Apply changes to the database)**
```sh
npm run migration:run
```
📌 **Example:**  
After generating a migration, use this to **apply the changes to the database**.  

🔹 **Output:**
```
Running pending migrations...
Migration 1700000000000-CreateUsersTable executed successfully.
```

---

## **3️⃣ Revert the Last Migration**
```sh
npm run migration:revert
```
📌 **Example:**  
If you made a mistake in a migration, this **rolls back the last executed migration**.  

🔹 **Output:**
```
Reverting last migration...
Migration 1700000000000-CreateUsersTable reverted successfully.
```

---

## **4️⃣ Sync Entities with Database Schema (⚠️ Use with Caution)**
```sh
npm run schema:sync
```
📌 **Example:**  
If you want to sync database schema **without using migrations** (not recommended in production).  

🔹 **Warning:**
```
Schema sync executed successfully.
⚠️ WARNING: This method can cause data loss if column types change.
```

---

## **5️⃣ Show All Migrations and Their Status**
```sh
npm run migration:show
```
📌 **Example:**  
Check **which migrations have been applied** and which are pending.  

🔹 **Output:**
```
[ ] 1700000000000-CreateUsersTable (Pending)
[X] 1699999999999-InitialMigration (Executed)
```

---

## **6️⃣ Create an Empty Migration File (Manually Edit)**
```sh
npm run migration:create -- ./app/migration/AddRoleColumn
```
📌 **Example:**  
Use this when you need to manually write a migration (e.g., adding a `role` column).  

🔹 **Generated file:**  
`app/migration/1700000000001-AddRoleColumn.ts`
```ts
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleColumn1700000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP COLUMN role;`);
    }
}
```
✔ **Run `npm run migration:run` to apply it.**  

---

# **🎯 Final Notes**
1️⃣ **After modifying entities, always generate and run migrations:**  
```sh
npm run migration:generate -- ./app/migration/UpdateSchema
npm run migration:run
```
  
2️⃣ **To undo the last migration:**  
```sh
npm run migration:revert
```
  
3️⃣ **To check migration status:**  
```sh
npm run migration:show
```
  
4️⃣ **To manually write a migration:**  
```sh
npm run migration:create -- ./app/migration/FixUsersTable
```

---

## 🚀 **Now you have a complete TypeORM migration guide!**  
Copy this into your notes and let me know if you need more clarifications. 💡