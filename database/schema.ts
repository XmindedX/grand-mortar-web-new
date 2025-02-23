import { uuid, varchar, integer, timestamp, pgTable, text, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";

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

// Schema untuk cart
export const carts = pgTable("carts", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  userId: uuid("user_id").unique().notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Schema untuk cart_items
export const cartItems = pgTable("cart_items", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  cartId: uuid("cart_id").references(() => carts.id),
  productId: uuid("product_id").unique().notNull().references(() => products.id),
  quantity: integer("quantity").notNull(),
});

export const orders = pgTable('orders', {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  trxId: varchar('trx_id').notNull().unique(),
  userId: uuid('user_id').references(() => users.id),
  customer: varchar('customer').notNull(),
  total: integer('total').notNull(),
  piutang: integer('piutang').notNull().default(0),
  status: text('status').notNull().default('Belum Lunas'),
  number: text('number').notNull(),
  email: text('email').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  province: text('province').notNull(),
  postalCode: integer('postal_code').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  
});

export const orderItems = pgTable('order_items', {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  orderId: uuid('order_id').references(() => orders.id),
  productId: uuid('product_id').references(() => products.id),
  quantity: integer('quantity').notNull(),
});

export const receipts = pgTable('receipts', {
  id: uuid('id').primaryKey().defaultRandom().unique(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  receiptNumber: varchar('receipt_number').unique().notNull(),
  customer: varchar('customer').notNull(),
  nominal: integer('nominal').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const orderRelations = relations(orders, ({ many }) => ({
  items: many(orderItems),
}));

export const cartRelations = relations(carts, ({ many }) => ({
  items: many(cartItems),
}));

export const cartItemRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
  product: one(products, {
    fields: [cartItems.productId],
    references: [products.id],
  }),
}));

export const orderItemRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

