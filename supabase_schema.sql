-- Supabase Database Schema for Site For Her
-- Run this SQL in your Supabase SQL Editor

-- ============================================
-- 1. TABLE: notes
-- Stores love notes/messages
-- ============================================
CREATE TABLE IF NOT EXISTS notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read (anyone can read notes)
CREATE POLICY "Allow public read notes" ON notes
  FOR SELECT
  USING (true);

-- Policy: Allow public insert (anyone can add notes)
CREATE POLICY "Allow public insert notes" ON notes
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow public update (anyone can update notes)
CREATE POLICY "Allow public update notes" ON notes
  FOR UPDATE
  USING (true);

-- Policy: Allow public delete (anyone can delete notes)
CREATE POLICY "Allow public delete notes" ON notes
  FOR DELETE
  USING (true);

-- ============================================
-- 2. TABLE: album_custom_images
-- Stores custom images added via the final cats
-- ============================================
CREATE TABLE IF NOT EXISTS album_custom_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE album_custom_images ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read
CREATE POLICY "Allow public read custom images" ON album_custom_images
  FOR SELECT
  USING (true);

-- Policy: Allow public insert
CREATE POLICY "Allow public insert custom images" ON album_custom_images
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow public update
CREATE POLICY "Allow public update custom images" ON album_custom_images
  FOR UPDATE
  USING (true);

-- Policy: Allow public delete
CREATE POLICY "Allow public delete custom images" ON album_custom_images
  FOR DELETE
  USING (true);

-- ============================================
-- 3. STORAGE BUCKET: album-images
-- For storing uploaded images
-- ============================================
-- Note: Create this bucket in Supabase Dashboard > Storage
-- Bucket name: album-images
-- Public: Yes

-- Storage Policy: Allow public read
-- (Create this in Supabase Dashboard > Storage > album-images > Policies)
-- Policy Name: Allow public read
-- Operation: SELECT
-- Policy Definition: true

-- Storage Policy: Allow public upload
-- (Create this in Supabase Dashboard > Storage > album-images > Policies)
-- Policy Name: Allow public upload
-- Operation: INSERT
-- Policy Definition: true

-- ============================================
-- INDEXES for better performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_album_custom_images_created_at ON album_custom_images(created_at DESC);
