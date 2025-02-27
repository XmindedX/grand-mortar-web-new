ALTER TABLE "orders" ALTER COLUMN "piutang" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "order_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "receipt_number" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "customer" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "nominal" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "created_at" SET NOT NULL;