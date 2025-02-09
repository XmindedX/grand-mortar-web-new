import { int } from 'drizzle-orm/mysql-core';
import { uuid, varchar, integer, timestamp, pgTable, text, pgEnum } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').notNull().defaultRandom().primaryKey().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const products = pgTable('products', {
  id: uuid('id').notNull().defaultRandom().primaryKey().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  price: integer('price').notNull(),
  stock: integer('stock').notNull(),
  image: text('image').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const cart = pgTable('cart', {
  id: uuid('id').notNull().defaultRandom().primaryKey().unique(),
  userId: uuid('userId')
  .notNull()
  .references(() => users.id),
  productId: uuid('productId')
  .notNull()
  .references(() => products.id),
  quantity: integer('quantity').notNull(),
});

// export const orders = pgTable('orders', {
//   id: uuid('id').notNull().primaryKey(),
//   userId: uuid('user_id').notNull().references(() => users.id),
//   productId: integer('product_id').notNull().references(() => products.id),
//   quantity: integer('quantity').notNull(),
//   status: PAYMENT_STATUS_ENUM('status').default('Belum Lunas'),
//   total: integer('total').notNull(),
//   piutang: integer('piutang').notNull(),
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

