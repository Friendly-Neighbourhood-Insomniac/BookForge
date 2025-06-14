/*
  # Add pages column to projects table

  1. Changes
    - Add `pages` column to `projects` table as JSONB type
    - Add `cover_url` column for storing cover image URLs
    - Update existing projects to have default page structure

  2. Security
    - No changes to RLS policies needed as they already cover the new columns
*/

-- Add pages column to store page and component data
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'pages'
  ) THEN
    ALTER TABLE projects ADD COLUMN pages jsonb DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Add cover_url column for cover images
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'cover_url'
  ) THEN
    ALTER TABLE projects ADD COLUMN cover_url text;
  END IF;
END $$;

-- Add cover_type and template_type columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'cover_type'
  ) THEN
    ALTER TABLE projects ADD COLUMN cover_type text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'template_type'
  ) THEN
    ALTER TABLE projects ADD COLUMN template_type text;
  END IF;
END $$;

-- Add author and description columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'author'
  ) THEN
    ALTER TABLE projects ADD COLUMN author text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'projects' AND column_name = 'description'
  ) THEN
    ALTER TABLE projects ADD COLUMN description text;
  END IF;
END $$;

-- Update existing projects to have a default page structure if pages is empty
UPDATE projects 
SET pages = '[{"id": "page_1", "title": "Page 1", "components": []}]'::jsonb
WHERE pages = '[]'::jsonb OR pages IS NULL;