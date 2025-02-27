ALTER TABLE "orders" ADD COLUMN "number" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "city" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "province" text NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "postal_code" integer NOT NULL;