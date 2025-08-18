import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }),
  createdAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
});

export const companies = pgTable('companies', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  owner: integer().references(() => users.id),
  createdAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
});

export const reservations = pgTable('reservations', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  company: integer().references(() => companies.id),
  user: integer().references(() => users.id),
  start: timestamp({ mode: 'date' }).notNull(),
  time: integer().notNull(), // time in minutes
  createdAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: 'date' }).notNull().defaultNow(),
});

