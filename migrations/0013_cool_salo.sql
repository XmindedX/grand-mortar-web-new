ALTER TABLE "receipts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_id_unique" UNIQUE("id");