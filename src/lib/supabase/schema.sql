-- AlphaTrend Database Schema
-- Based on Document 8: Database Schema & API Contract Specification

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CORE TABLES
-- ============================================

-- Snapshots table - immutable market state every 15 minutes
CREATE TABLE snapshots (
  snapshot_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recalculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  snapshot_quality_score FLOAT DEFAULT 1.0,
  ingestion_completeness_score FLOAT DEFAULT 1.0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tokens table - canonical token registry
CREATE TABLE tokens (
  token_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chain TEXT NOT NULL CHECK (chain IN ('solana', 'base', 'ethereum', 'bnb')),
  canonical_address TEXT NOT NULL,
  symbol TEXT NOT NULL,
  name TEXT,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (chain, canonical_address)
);

-- Token features - raw and normalized features per snapshot
CREATE TABLE token_features (
  snapshot_id UUID NOT NULL REFERENCES snapshots(snapshot_id) ON DELETE CASCADE,
  token_id UUID NOT NULL REFERENCES tokens(token_id) ON DELETE CASCADE,
  raw_features JSONB DEFAULT '{}',
  normalized_features JSONB DEFAULT '{}',
  completeness_score FLOAT DEFAULT 1.0,
  PRIMARY KEY (snapshot_id, token_id)
);

-- Token outputs - computed scores and classifications
CREATE TABLE token_outputs (
  snapshot_id UUID NOT NULL REFERENCES snapshots(snapshot_id) ON DELETE CASCADE,
  token_id UUID NOT NULL REFERENCES tokens(token_id) ON DELETE CASCADE,
  structural_score FLOAT NOT NULL DEFAULT 0 CHECK (structural_score >= 0 AND structural_score <= 100),
  attention_score FLOAT DEFAULT 0,
  liquidity_score FLOAT DEFAULT 0,
  whale_score FLOAT DEFAULT 0,
  engineering_score FLOAT DEFAULT 0,
  integrity_label TEXT CHECK (integrity_label IN ('organic', 'mixed', 'engineered')),
  lifecycle_phase TEXT CHECK (lifecycle_phase IN ('ignition', 'expansion', 'crowding', 'distribution', 'decay')),
  driver_cards JSONB DEFAULT '[]',
  confidence_score FLOAT DEFAULT 1.0,
  PRIMARY KEY (snapshot_id, token_id)
);

-- Metas table - narrative cluster registry
CREATE TABLE metas (
  meta_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meta_name TEXT NOT NULL,
  first_detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Meta membership - which tokens belong to which metas per snapshot
CREATE TABLE meta_membership (
  snapshot_id UUID NOT NULL REFERENCES snapshots(snapshot_id) ON DELETE CASCADE,
  meta_id UUID NOT NULL REFERENCES metas(meta_id) ON DELETE CASCADE,
  token_id UUID NOT NULL REFERENCES tokens(token_id) ON DELETE CASCADE,
  PRIMARY KEY (snapshot_id, meta_id, token_id)
);

-- Meta outputs - computed meta-level scores
CREATE TABLE meta_outputs (
  snapshot_id UUID NOT NULL REFERENCES snapshots(snapshot_id) ON DELETE CASCADE,
  meta_id UUID NOT NULL REFERENCES metas(meta_id) ON DELETE CASCADE,
  meta_score FLOAT NOT NULL DEFAULT 0,
  lifecycle_phase TEXT CHECK (lifecycle_phase IN ('ignition', 'expansion', 'crowding', 'distribution', 'decay')),
  capital_share FLOAT DEFAULT 0,
  share_shift FLOAT DEFAULT 0,
  integrity_mix JSONB DEFAULT '{"organic": 0, "mixed": 0, "engineered": 0}',
  whale_overlap_score FLOAT DEFAULT 0,
  driver_cards JSONB DEFAULT '[]',
  confidence_score FLOAT DEFAULT 1.0,
  PRIMARY KEY (snapshot_id, meta_id)
);

-- Chain outputs - per-chain heat scores
CREATE TABLE chain_outputs (
  snapshot_id UUID NOT NULL REFERENCES snapshots(snapshot_id) ON DELETE CASCADE,
  chain TEXT NOT NULL CHECK (chain IN ('solana', 'base', 'ethereum', 'bnb')),
  chain_heat_score FLOAT DEFAULT 0,
  dominant_driver TEXT CHECK (dominant_driver IN ('attention', 'capital', 'engineering')),
  total_eligible_tokens INT DEFAULT 0,
  capital_share FLOAT DEFAULT 0,
  PRIMARY KEY (snapshot_id, chain)
);

-- Regime outputs - market-wide classification
CREATE TABLE regime_outputs (
  snapshot_id UUID PRIMARY KEY REFERENCES snapshots(snapshot_id) ON DELETE CASCADE,
  regime_label TEXT NOT NULL CHECK (regime_label IN ('rotation', 'expansion', 'fragmented', 'contraction')),
  regime_confidence FLOAT DEFAULT 1.0
);

-- Latest snapshot pointer - single row table
CREATE TABLE latest_snapshot_pointer (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  snapshot_id UUID REFERENCES snapshots(snapshot_id)
);

-- Initialize with empty pointer
INSERT INTO latest_snapshot_pointer (id, snapshot_id) VALUES (1, NULL);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_token_outputs_score ON token_outputs(snapshot_id, structural_score DESC);
CREATE INDEX idx_meta_outputs_score ON meta_outputs(snapshot_id, meta_score DESC);
CREATE INDEX idx_meta_membership_snapshot ON meta_membership(snapshot_id, meta_id);
CREATE INDEX idx_tokens_chain_symbol ON tokens(chain, symbol);
CREATE INDEX idx_snapshots_time ON snapshots(recalculated_at DESC);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE metas ENABLE ROW LEVEL SECURITY;
ALTER TABLE meta_membership ENABLE ROW LEVEL SECURITY;
ALTER TABLE meta_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE chain_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE regime_outputs ENABLE ROW LEVEL SECURITY;
ALTER TABLE latest_snapshot_pointer ENABLE ROW LEVEL SECURITY;

-- Read-only policies for authenticated users
CREATE POLICY "Read snapshots" ON snapshots FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read tokens" ON tokens FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read token_features" ON token_features FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read token_outputs" ON token_outputs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read metas" ON metas FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read meta_membership" ON meta_membership FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read meta_outputs" ON meta_outputs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read chain_outputs" ON chain_outputs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read regime_outputs" ON regime_outputs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Read latest_snapshot" ON latest_snapshot_pointer FOR SELECT TO authenticated USING (true);

-- Service role can write (for ingestion workers)
CREATE POLICY "Service write snapshots" ON snapshots FOR ALL TO service_role USING (true);
CREATE POLICY "Service write tokens" ON tokens FOR ALL TO service_role USING (true);
CREATE POLICY "Service write token_features" ON token_features FOR ALL TO service_role USING (true);
CREATE POLICY "Service write token_outputs" ON token_outputs FOR ALL TO service_role USING (true);
CREATE POLICY "Service write metas" ON metas FOR ALL TO service_role USING (true);
CREATE POLICY "Service write meta_membership" ON meta_membership FOR ALL TO service_role USING (true);
CREATE POLICY "Service write meta_outputs" ON meta_outputs FOR ALL TO service_role USING (true);
CREATE POLICY "Service write chain_outputs" ON chain_outputs FOR ALL TO service_role USING (true);
CREATE POLICY "Service write regime_outputs" ON regime_outputs FOR ALL TO service_role USING (true);
CREATE POLICY "Service write latest_snapshot" ON latest_snapshot_pointer FOR ALL TO service_role USING (true);
