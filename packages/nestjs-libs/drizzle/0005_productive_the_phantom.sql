ALTER TABLE "ratings" ALTER COLUMN "rating" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "review" text NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "created_at" timestamp DEFAULT CURRENT_TIMESTAMP;