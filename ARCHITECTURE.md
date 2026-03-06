# ARCHITECTURE.md

## Architecture Goal
Build Harmony in a way that is:
- simple enough for a solo developer
- scalable enough to support growth
- reusable for Android now and iOS later
- easy to debug
- easy to evolve step by step

## Recommended MVP Architecture
For MVP, use a modular backend with clear service boundaries, but avoid unnecessary complexity.

### Core Stack
- Mobile frontend: Android app
- Backend API: single backend app or modular service structure
- Database: Supabase Postgres
- Auth: Supabase Auth
- Storage: Supabase Storage
- AI Integration: report/insight generation layer
- Logging: logs table in database

## Why Supabase
- relational data fits Harmony well
- easy SQL, joins, and admin visibility
- managed Postgres
- easy auth and storage integration
- useful for logs and analytics
- simpler than self-hosting database

## High-Level Flow
1. User signs up / logs in
2. User creates assessment
3. Assessment starts as trial
4. User invites partner
5. Both answer trial modules
6. Scoring engine calculates structured compatibility data
7. AI generates basic report
8. User can upgrade to full assessment
9. Full modules unlock
10. Full scoring runs
11. AI generates full report
12. Reports/logs stored in database

## Core Logical Modules
### 1. Auth Module
Responsible for:
- signup/login
- user sessions
- access control

### 2. Assessment Module
Responsible for:
- creating assessments
- linking two participants
- handling trial/full mode
- tracking progress
- pause/cancel
- 30-day incomplete rule

### 3. Question Module
Responsible for:
- question set versioning
- pillar/module definitions
- trial vs full accessibility
- question weights and metadata

### 4. Response Module
Responsible for:
- saving answers
- updating progress
- partial saves
- answer validation

### 5. Scoring Engine
Responsible for:
- calculating question-level compatibility
- pillar scores
- overall alignment score
- confidence score
- critical mismatch detection
- structured discussion priorities

### 6. AI Insight Module
Responsible for:
- converting structured results into easy language
- generating overview summary
- generating pillar explanations
- generating discussion prompts
- keeping tone neutral and clear

### 7. Reporting Module
Responsible for:
- basic report generation
- full report generation
- storing report JSON
- PDF support later

### 8. Payment/Upgrade Module
Responsible for:
- full assessment purchase
- upgrading trial assessment to full
- gift purchase
- tracking order/payment status

### 9. Logging Module
Responsible for:
- logging user and system events
- debugging
- tracking report generation
- tracking failed or blocked flows

## Future Microservice Direction
Later, if needed, split into:
- auth-service
- assessment-service
- scoring-service
- report-service
- notification-service
- payment-service

For now:
- keep boundaries in code
- can remain in one backend project
- split later when needed

## Event/Trigger Candidates
Not required day one, but useful later:
- assessment_created
- invite_sent
- invite_accepted
- trial_completed
- upgrade_completed
- report_generated
- gift_created
- gift_claimed
- assessment_expired
- reminder_sent

## State Model
### Assessment Types
- trial
- full

### Assessment Status
- active
- paused
- cancelled
- completed
- expired

### Purchase Status
- not_required
- required
- paid

### Invite Status
- sent
- accepted
- revoked
- expired

### Report Types
- basic
- full

## Trial Logic
- user can answer selected trial pillars only
- user can generate basic report
- after 30 days, incomplete trial may require purchase to continue
- upgrade unlocks all remaining pillars

## Gift Logic
- giver purchases on behalf of recipient(s)
- gifted assessment is linked to assessment instance
- recipients complete the assessment
- report belongs to that assessment instance

## Android / iOS Consideration
Backend must stay platform-neutral.
Clients should only depend on:
- auth endpoints
- assessment endpoints
- report endpoints

No backend logic should be Android-specific.

## AI Usage Boundary
AI should never:
- calculate compatibility score
- decide who is correct
- predict relationship success/failure

AI should only:
- explain scores
- simplify insights
- generate guided discussion prompts

## Logging Design
All major operations should log:
- user id
- assessment id
- event name
- status
- details JSON
- timestamp

## Security / Privacy Principles
- only participants should see the report
- no side-by-side “who answered what” in shared report
- no blame or sensitive raw answer exposure by default
- store only necessary data
- keep AI inputs minimal and anonymized where possible