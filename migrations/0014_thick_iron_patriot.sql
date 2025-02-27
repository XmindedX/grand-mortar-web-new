ALTER TABLE "receipts" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "order_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "receipt_number" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "customer" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "nominal" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "receipts" ALTER COLUMN "created_at" DROP NOT NULL;