# DB_SCHEMA.md

## Database Choice
Supabase Postgres

## Design Principles
- relational structure
- easy to query
- easy to debug
- supports trial + full flows
- supports gifting
- supports logging
- supports future analytics

---

## 1. users
Stores application users.

### Fields
- id (uuid, pk)
- email (nullable, unique)
- phone (nullable, unique)
- full_name
- auth_provider
- created_at
- updated_at

---

## 2. assessments
One order = one assessment instance.

### Fields
- id (uuid, pk)
- owner_user_id (uuid, fk users.id)
- kind (text: self, gift)
- tier (text: trial, full)
- status (text: active, paused, cancelled, completed, expired)
- purchase_status (text: not_required, required, paid)
- question_set_version (text)
- report_version (text)
- started_at
- last_activity_at
- expires_at
- completed_at
- created_at
- updated_at

### Notes
- trial starts with selected modules only
- full unlocks all pillars
- 30-day logic uses expires_at

---

## 3. participants
Links users to an assessment.

### Fields
- id (uuid, pk)
- assessment_id (uuid, fk assessments.id)
- user_id (uuid, fk users.id)
- role (text: A, B)
- joined_at
- created_at

### Notes
- one assessment usually has two participants
- role helps pair responses

---

## 4. invites
Tracks invite links/codes.

### Fields
- id (uuid, pk)
- assessment_id (uuid, fk assessments.id)
- token (text, unique)
- invited_contact (text)
- role (text, default B)
- status (text: sent, accepted, revoked, expired)
- created_at
- accepted_at
- expires_at

---

## 5. question_sets
Question versioning container.

### Fields
- id (uuid, pk)
- version (text, unique)
- status (text: active, deprecated)
- created_at

---

## 6. pillars
Defines major assessment pillars.

### Fields
- id (text, pk)
- name
- description
- display_order
- is_trial_enabled (bool)
- is_active (bool)
- created_at

### Example Pillars
- family
- finance
- conflict
- life_goals
- emotional
- lifestyle
- parenting
- intimacy

---

## 7. questions
Stores all questions.

### Fields
- id (text, pk)
- question_set_id (uuid, fk question_sets.id)
- pillar_id (text, fk pillars.id)
- question_text
- question_type (text: scale, multiple_choice, scenario)
- scale_min
- scale_max
- weight (numeric)
- is_trial_allowed (bool)
- is_sensitive (bool)
- order_index
- help_text
- created_at
- updated_at

---

## 8. responses
Stores answers.

### Fields
- id (uuid, pk)
- assessment_id (uuid, fk assessments.id)
- user_id (uuid, fk users.id)
- pillar_id (text, fk pillars.id)
- question_id (text, fk questions.id)
- value_int
- value_text (nullable)
- answered_at
- created_at
- updated_at

### Constraints
- unique (assessment_id, user_id, question_id)

---

## 9. module_progress
Tracks progress by pillar/module per user.

### Fields
- id (uuid, pk)
- assessment_id (uuid, fk assessments.id)
- user_id (uuid, fk users.id)
- pillar_id (text, fk pillars.id)
- status (text: not_started, in_progress, completed, locked)
- completed_at
- updated_at

---

## 10. scores
Stores deterministic scoring output.

### Fields
- id (uuid, pk)
- assessment_id (uuid, fk assessments.id, unique)
- scoring_version (text)
- overall_alignment_score (numeric)
- confidence_score (numeric)
- pillar_scores_json (jsonb)
- critical_flags_json (jsonb)
- discussion_priorities_json (jsonb)
- strengths_json (jsonb)
- computed_at

---

## 11. reports
Stores generated reports.

### Fields
- id (uuid, pk)
- assessment_id (uuid, fk assessments.id)
- report_type (text: basic, full)
- scoring_version (text)
- ai_used (bool)
- ai_model (text)
- prompt_version (text)
- tokens_used (int, nullable)
- report_json (jsonb)
- pdf_url (text, nullable)
- created_at

---

## 12. orders
Tracks purchases.

### Fields
- id (uuid, pk)
- assessment_id (uuid, fk assessments.id)
- buyer_user_id (uuid, fk users.id)
- order_type (text: upgrade, gift, direct_full)
- amount
- currency
- provider (text)
- provider_order_id (text)
- provider_payment_id (text, nullable)
- status (text: created, paid, failed, refunded)
- created_at
- paid_at

---

## 13. gifts
Tracks gift purchases and redemption.

### Fields
- id (uuid, pk)
- giver_user_id (uuid, fk users.id)
- assessment_id (uuid, fk assessments.id)
- recipient_contact_a (text, nullable)
- recipient_contact_b (text, nullable)
- gift_message (text, nullable)
- status (text: sent, claimed, completed, expired)
- created_at
- claimed_at

---

## 14. logs
Tracks important events for debugging and analytics.

### Fields
- id (uuid, pk)
- service_name (text)
- level (text: info, warning, error)
- event_name (text)
- user_id (uuid, nullable)
- assessment_id (uuid, nullable)
- details_json (jsonb)
- created_at

### Example event_name values
- user_registered
- assessment_created
- invite_sent
- invite_accepted
- response_saved
- basic_report_generated
- upgrade_initiated
- full_report_generated
- gift_created
- assessment_expired
- reminder_sent
- ai_generation_failed

---

## 15. reminders
Optional scheduled reminders table.

### Fields
- id (uuid, pk)
- assessment_id (uuid, fk assessments.id)
- reminder_type (text)
- scheduled_for
- status (text: pending, sent, failed, cancelled)
- created_at
- sent_at

---

## Trial Access Rules
Trial users can access only:
- pillars where pillars.is_trial_enabled = true
- questions where questions.is_trial_allowed = true

---

## Full Access Rules
Full users can access all active pillars and questions.

---

## Important Missing-Functionality Check
This schema covers:
- users
- assessments
- trial/full
- partner invite
- responses
- scores
- AI reports
- orders
- gifts
- logs
- 30-day logic
- pause/cancel compatibility
- future report export

No major planned functionality is intentionally omitted.