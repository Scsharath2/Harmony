# API_PLAN.md

## API Goal
Provide a clean backend API for Android now and iOS later.

## API Style
- REST for MVP
- JSON request/response
- Authenticated endpoints where needed
- Clear error responses
- Versioning later if required

---

## 1. Auth APIs

### POST /auth/register
Create user account.

### POST /auth/login
Login user.

### POST /auth/logout
Logout user.

### GET /auth/me
Fetch current user profile.

---

## 2. Assessment APIs

### POST /assessments
Create a new assessment.
#### Input
- kind (self/gift)
- tier (default trial)

#### Output
- assessment_id
- current status
- accessible pillars

---

### GET /assessments/{assessment_id}
Get assessment details.

### GET /assessments/{assessment_id}/status
Get current assessment progress/status.

### POST /assessments/{assessment_id}/pause
Pause the assessment.

### POST /assessments/{assessment_id}/resume
Resume the assessment.

### POST /assessments/{assessment_id}/cancel
Cancel the assessment.

---

## 3. Participant / Invite APIs

### POST /assessments/{assessment_id}/invite
Send invite to partner.

### POST /invites/{token}/accept
Accept invite and join assessment.

### GET /assessments/{assessment_id}/participants
Fetch assessment participants.

---

## 4. Question APIs

### GET /question-sets/active
Fetch active question set version.

### GET /pillars
Fetch available pillars.

### GET /assessments/{assessment_id}/pillars
Fetch pillars accessible to this assessment (trial/full aware).

### GET /assessments/{assessment_id}/pillars/{pillar_id}/questions
Fetch questions for a pillar.

---

## 5. Response APIs

### POST /assessments/{assessment_id}/responses
Save one or more answers.

### GET /assessments/{assessment_id}/responses/{pillar_id}
Fetch saved answers for a pillar for current user.

### GET /assessments/{assessment_id}/progress
Fetch progress summary.

---

## 6. Scoring / Report APIs

### POST /assessments/{assessment_id}/score
Run deterministic scoring.

### POST /assessments/{assessment_id}/reports/basic
Generate basic report.

### POST /assessments/{assessment_id}/reports/full
Generate full report.

### GET /assessments/{assessment_id}/reports/latest
Fetch latest report.

### GET /assessments/{assessment_id}/reports/history
Fetch report history.

---

## 7. Upgrade / Payment APIs

### POST /assessments/{assessment_id}/upgrade
Create upgrade order for full report.

### POST /payments/webhook
Payment provider callback.

### GET /orders/{order_id}
Fetch order/payment status.

---

## 8. Gift APIs

### POST /gifts
Create gift assessment/order.

### GET /gifts/{gift_id}
Fetch gift details.

### POST /gifts/{gift_id}/claim
Claim gifted assessment.

---

## 9. Reminder / Expiry APIs

### GET /assessments/{assessment_id}/expiry
Get expiry info.

### POST /assessments/{assessment_id}/check-expiry
Internal/system endpoint to update expiry status.

### POST /reminders/run
Internal endpoint to process pending reminders.

---

## 10. Logs / Admin APIs

### POST /logs
Create log entry (internal use mostly).

### GET /logs
Filter logs by assessment/user/event.

### GET /admin/assessments
Admin list of assessments.

### GET /admin/reports
Admin list of reports.

---

## Core API Flow: Trial
1. register/login
2. create assessment
3. invite partner
4. accept invite
5. fetch trial pillars
6. save responses
7. score
8. generate basic report

---

## Core API Flow: Upgrade to Full
1. create upgrade order
2. payment success
3. update assessment tier to full
4. unlock full pillars
5. continue answering
6. full score
7. full AI report

---

## Core API Flow: Gift
1. create gift
2. create paid assessment
3. send gift link
4. recipient claims
5. participants answer
6. report generated

---

## AI Report Generation Rule
AI should only receive:
- structured scores
- discussion priorities
- strengths
- confidence
- report type

AI should not receive:
- raw full answer dumps if avoidable
- unnecessary personal information

---

## Error Handling
All APIs should return:
- status
- code
- human-readable message
- optional details

### Example common errors
- assessment_not_found
- assessment_expired
- payment_required
- invite_invalid
- report_not_ready
- unauthorized
- ai_generation_failed

---

## Future APIs (Later)
- counselor dashboard APIs
- multilingual reports
- PDF export
- notifications/push APIs
- analytics endpoints