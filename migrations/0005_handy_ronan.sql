ALTER TABLE "cart_items" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_unique" UNIQUE("cart_id");--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_unique" UNIQUE("product_id");--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_unique" UNIQUE("user_id");