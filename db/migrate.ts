import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);
  
  // Create migrations table if it doesn't exist
  await sql`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      executed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )
  `;

  // Get executed migrations
  const executed = await sql`SELECT name FROM migrations`;
  const executedMigrations = new Set(executed.map(row => row.name));

  // Read migration files
  const migrationsDir = path.join(process.cwd(), 'db', 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  // Run pending migrations
  for (const file of files) {
    if (!executedMigrations.has(file)) {
      console.log(`Running migration: ${file}`);
      const migration = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

      console.log(migration);
      await sql`${migration}`;
      await sql`INSERT INTO migrations (name) VALUES (${file})`;

    }
  }

  console.log('Migrations completed');
  process.exit(0);
}

migrate().catch(console.error);