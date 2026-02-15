# AlphaTrend V1

Cross-chain crypto market intelligence system. Real-time structural analysis of markets across Solana, Base, Ethereum, and BNB.

## Features

- **15-Minute Snapshots**: Atomic, immutable market structure snapshots
- **4 Chains**: Solana, Base, Ethereum, BNB with chain-specific thresholds
- **5 Feature Layers**: Attention, Liquidity, Whale, Engineering, Coherence
- **Meta Clustering**: Emergent narrative detection across tokens
- **Market Regime**: Rotation, Expansion, Fragmented, Contraction classification
- **Integrity Grading**: Organic, Mixed, Engineered classification

## Tech Stack

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (email-based)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for auth/database)

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Deployment to Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

Or use CLI:

```bash
vercel --prod
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Main dashboard
│   ├── trending/           # Trending tokens by integrity
│   ├── metas/              # Meta clusters
│   ├── chains/             # Chain analysis
│   ├── tokens/[id]/        # Token detail
│   ├── login/              # Auth pages
│   └── api/                # API routes
├── components/             # React components
│   ├── ui/                 # Base UI components
│   ├── layout/             # Layout components
│   └── dashboard/          # Dashboard-specific components
├── lib/                    # Utilities
│   ├── supabase/           # Supabase client
│   ├── mock-data.ts        # Mock data for demo
│   └── utils.ts            # Utility functions
└── types/                  # TypeScript types
```

## Current Status

- ✅ Core UI implemented
- ✅ Auth flow (demo mode + Supabase)
- ✅ Dashboard with Meta Board
- ✅ Token detail pages
- ✅ Chain heat analysis
- ✅ Integrity segmentation
- ✅ Feature radar visualization
- ✅ API routes
- 🔄 Mock data (replace with real data sources)
- ⏳ Real data ingestion (DexScreener, Birdeye, etc.)
- ⏳ Database schema implementation
- ⏳ 15-minute cron job

## Notes

- Currently using mock data for demonstration
- "Continue with Demo" bypasses auth for easy testing
- Real data integration requires API keys for:
  - DexScreener
  - Birdeye
  - Chain-specific RPCs
  - Social APIs (optional)

## Architecture

See `/docs/specs/` for full specification documents covering:
- System philosophy
- Data eligibility
- Snapshot architecture
- Feature engineering
- Inference engine
- Meta clustering
- UI architecture
- Database schema
- Security

## License

Private - AlphaTrend
