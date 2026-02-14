-- ============================================
-- TikTok KOL Platform Database Schema
-- Phase 1: Creator Identity & Contact Management
-- Generated: 2026-02-14
-- Database: PostgreSQL
-- ============================================

-- Enable pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum for User Roles (if not already exists)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_role') THEN
        CREATE TYPE "user_role" AS ENUM ('ADMIN', 'BRAND', 'AGENCY', 'CREATOR');
    END IF;
END$$;

-- ============================================
-- 1. Table: users
-- Purpose: User authentication and access control
-- ============================================
CREATE TABLE IF NOT EXISTS "users" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "user_role" NOT NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP
);

-- Index on email (already unique constraint, but explicit index requested if needed for partial/specific queries)
CREATE INDEX IF NOT EXISTS "idx_users_email" ON "users"("email");

-- ============================================
-- 2. Table: agencies
-- Purpose: Talent agencies managing creators
-- ============================================
CREATE TABLE IF NOT EXISTS "agencies" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "contact_email" VARCHAR(255),
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP
);

-- ============================================
-- 3. Table: creators
-- Purpose: TikTok creators/KOL profiles
-- ============================================
CREATE TABLE IF NOT EXISTS "creators" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,
    "tiktok_username" VARCHAR(255) NOT NULL UNIQUE,
    "tiktok_profile_url" VARCHAR(500) NOT NULL,
    "content_language" VARCHAR(100),
    "city" VARCHAR(100),
    "country" VARCHAR(100),
    "agency_id" UUID REFERENCES "agencies"("id") ON DELETE SET NULL,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP
);

-- Index on tiktok_username
CREATE INDEX IF NOT EXISTS "idx_creators_tiktok_username" ON "creators"("tiktok_username");

-- ============================================
-- 4. Table: creator_contacts
-- Purpose: Encrypted contact information for creators
-- ============================================
CREATE TABLE IF NOT EXISTS "creator_contacts" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "creator_id" UUID NOT NULL UNIQUE REFERENCES "creators"("id") ON DELETE CASCADE,
    "email_encrypted" TEXT,
    "whatsapp_encrypted" TEXT,
    "is_verified" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP DEFAULT now() NOT NULL,
    "updated_at" TIMESTAMP,
    "deleted_at" TIMESTAMP
);

-- Note: creator_id is UNIQUE, so it indexed automatically. Explicit additional index is often redundant but harmless.

-- ============================================
-- 5. Table: contact_unlocks
-- Purpose: Audit log for contact information unlocks
-- Constraint: Immutable Audit Table (NO SOFT DELETE)
-- ============================================
CREATE TABLE IF NOT EXISTS "contact_unlocks" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "creator_id" UUID NOT NULL REFERENCES "creators"("id") ON DELETE RESTRICT,
    "user_id" UUID NOT NULL REFERENCES "users"("id") ON DELETE RESTRICT,
    "unlocked_at" TIMESTAMP DEFAULT now() NOT NULL
);

-- Indexes for audit queries
CREATE INDEX IF NOT EXISTS "idx_contact_unlocks_creator_id" ON "contact_unlocks"("creator_id");
CREATE INDEX IF NOT EXISTS "idx_contact_unlocks_user_id" ON "contact_unlocks"("user_id");

-- ============================================
-- End of Schema
-- ============================================
