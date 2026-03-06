# NEXT_STEPS.md

## Goal
Build Harmony step by step without getting overwhelmed.

## Rule
Do not build everything at once.
Ship in small milestones.

---

## Phase 1: Product Foundation
### Step 1
Finalize product rules:
- trial modules
- full modules
- report types
- upgrade logic
- gift logic
- 30-day logic

### Step 2
Finalize database schema.

### Step 3
Set up Supabase project.

### Step 4
Create core tables:
- users
- assessments
- participants
- invites
- pillars
- questions
- responses
- logs

### Step 5
Insert initial pillar/question data.

---

## Phase 2: Core Backend MVP
### Step 6
Build auth flow.

### Step 7
Build assessment creation.

### Step 8
Build partner invite flow.

### Step 9
Build question fetch API.

### Step 10
Build response save API.

### Step 11
Build progress tracking.

---

## Phase 3: Scoring + Basic Report
### Step 12
Implement deterministic compatibility scoring.

### Step 13
Implement pillar scores.

### Step 14
Implement overall alignment score.

### Step 15
Implement confidence score.

### Step 16
Implement critical mismatch detection.

### Step 17
Build basic report generator.

---

## Phase 4: AI Insight Layer
### Step 18
Create AI prompt design for simple language.

### Step 19
Build AI report generation endpoint.

### Step 20
Generate:
- report overview
- pillar explanations
- discussion prompts

### Step 21
Store generated reports in DB.

### Step 22
Log AI usage and failures.

---

## Phase 5: Upgrade + Full Assessment
### Step 23
Build order/upgrade flow.

### Step 24
Unlock full pillars after payment.

### Step 25
Generate full report.

### Step 26
Add report history support.

---

## Phase 6: Gift + Expiry Logic
### Step 27
Build gifting flow.

### Step 28
Build gift claim flow.

### Step 29
Implement 30-day incomplete logic.

### Step 30
Implement reminder scheduling.

### Step 31
Implement pause/resume/cancel.

---

## Phase 7: Android Integration
### Step 32
Connect Android app to auth APIs.

### Step 33
Connect assessment flow.

### Step 34
Connect invite flow.

### Step 35
Connect report screens.

### Step 36
Connect upgrade flow.

### Step 37
Test full trial-to-full journey.

---

## Phase 8: Production Hardening
### Step 38
Add row-level security / access policies.

### Step 39
Improve logging and observability.

### Step 40
Add input validation and rate limiting.

### Step 41
Add PDF export.

### Step 42
Prepare iOS-compatible client contract.

---

## Current Recommended Next Task
Start a new chat and ask for:

"Generate Supabase SQL schema for Harmony MVP, including trial, full upgrade, gifting, reports, and logs."

---

## Working Method For New Chats
At the start of each new chat:
1. paste PROJECT_OVERVIEW.md summary
2. paste current task only
3. ask for one deliverable at a time

---

## Current Priorities
- keep architecture simple
- avoid overengineering
- get trial flow working
- prove users understand report
- add payment only after value is visible

---

## Things To Avoid Right Now
- full microservices deployment complexity
- too many AI calls
- too many pillars before trial works
- advanced analytics before scoring works
- counselor dashboard before core app works