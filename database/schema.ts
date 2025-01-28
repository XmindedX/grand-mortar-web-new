import { uuid, varchar, pgTable, text, pgEnum } from 'drizzle-orm/pg-core';

// export const PAYMENT_STATUS_ENUM = pgEnum('payment_status', ['Belum Lunas', 'Lunas']);
export const ROLE_ENUM = pgEnum('role', ['Admin', 'SuperAdmin']);

export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: ROLE_ENUM('role').default('Admin'),
});

// export const products = pgTable('products', {
//   id: uuid('id').notNull().primaryKey(),
//   name: varchar('name', { length: 255 }).notNull(),
//   price: integer('price').notNull(),
//   image: text('image').notNull(),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// });

// export const orders = pgTable('orders', {
//   id: uuid('id').notNull().primaryKey(),
//   userId: uuid('user_id').notNull().references(() => users.id),
//   productId: integer('product_id').notNull().references(() => products.id),
//   quantity: integer('quantity').notNull(),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// });

// export const receipt = pgTable('receipt', {
//   id: uuid('id').notNull().primaryKey(),
//   userId: uuid('user_id').notNull().references(() => users.id),
//   productId: integer('product_id').notNull().references(() => products.id),
//   quantity: integer('quantity').notNull(),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// });

// export const cart = pgTable('cart', {
//   id: uuid('id').notNull().primaryKey(),
//   userId: uuid('user_id').notNull().references(() => users.id),
//   productId: integer('product_id').notNull().references(() => products.id),
//   quantity: integer('quantity').notNull(),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at').notNull().defaultNow(),
// });

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
