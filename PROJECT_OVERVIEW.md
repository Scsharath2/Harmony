# PROJECT_OVERVIEW.md

## Project Name
Harmony

## One-Line Summary
Harmony is a professional pre-marital alignment assessment app that helps couples understand important differences before marriage through structured questions, simple reports, and guided discussion insights.

## Product Goal
Help couples reduce misunderstandings before marriage by identifying alignment areas, discussion priorities, and expectation gaps in a respectful, neutral, and easy-to-understand way.

## Primary Audience
- Engaged couples
- Couples considering marriage
- Premarital counselors
- Matchmakers / relationship professionals

## Platform Strategy
- Phase 1: Android app
- Phase 2: iOS app
- Shared backend for both platforms

## Current Tech Direction
- Frontend/mobile: Android first
- Backend: step-by-step MVP backend
- Database: Supabase (Postgres)
- Storage: Supabase Storage
- Auth: Supabase Auth (initially)
- Logging: database-backed logs
- AI: used for insight/report generation only, not for compatibility scoring
- Hosting: cloud-managed services, not local DB hosting

## Core Product Principles
- No "right" or "wrong" partner language
- Reports must be simple, clear, and respectful
- Avoid complex psychology jargon
- Show value before forcing payment
- Use deterministic scoring + AI explanation
- Trust-first product design
- Easy to understand for normal users, not just experts

## Core Business Model
### Trial / Basic
- User can answer selected free modules
- User can generate a basic report
- Basic report shows limited but useful insights

### Full / Paid
- Unlock all pillars
- Generate full relationship alignment report
- Get deeper insights and guided discussion prompts
- PDF export / premium report later

## Main Features
- 1 order = 1 assessment
- Trial assessment flow
- Full assessment upgrade flow
- Invite partner
- Basic report
- Full report
- AI-generated insights in simple language
- Gifting
- 30-day incomplete logic
- Pause/cancel assessment
- Logging and traceability
- Future counselor/pro dashboard

## Product Tone
- Professional
- Neutral
- Supportive
- Clear
- Non-judgmental

## What Harmony Is NOT
- Not a dating app
- Not a matrimony marketplace
- Not a "love score" quiz
- Not a therapy substitute
- Not a divorce predictor

## Current Product Decisions
- Use Supabase instead of Firebase
- Android first, iOS later
- Frontend can run locally during development
- Backend built incrementally
- Logs stored from day one
- AI used for report writing, not decision logic
- Trial users should see value before paying
- Trial should unlock selected modules only
- Full purchase should unlock complete report
- Reports should be readable in simple English

## Trial Modules (Current Direction)
These can change later, but current direction:
- Family & In-Law Dynamics
- Lifestyle Compatibility
- Optional: Emotional Communication

## Full Modules / Pillars
- Family & In-Law Dynamics
- Financial Philosophy
- Conflict Resolution Style
- Life Vision & Ambition
- Emotional Communication
- Lifestyle Compatibility
- Parenting Philosophy
- Intimacy & Relationship Expectations

## AI Usage Policy
- AI explains results
- AI suggests discussion prompts
- AI must use simple language
- AI must avoid blame, diagnosis, or prediction
- AI output must stay aligned to scoring engine data

## Passive Income Goal
Target is to build Harmony into a useful, trust-based digital product that can generate recurring or semi-passive income through paid assessments and upgrades.

## Long-Term Optional Expansion
- Counselor dashboard
- Counselor-assisted reports
- Multi-language support
- Partner journaling / guided discussion mode
- PDF report export
- Relationship progress mode after marriage