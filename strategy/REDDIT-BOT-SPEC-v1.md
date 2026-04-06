# IntroAlimentar — Reddit Approval Bot Spec v1

## Goal
Build a long-term mini-service that:
1. monitors selected Reddit communities
2. finds relevant parent-feeding threads
3. drafts replies using OpenClaw + the reply bank
4. requires human approval before posting
5. logs outcomes for learning

This is **approval-first autonomy**.

---

## Product Requirements

### Must have
- subreddit monitoring
- keyword/topic classification
- candidate scoring
- draft generation
- approval queue
- Reddit posting after approval
- logging + analytics
- rate limiting + cooldowns

### Nice to have later
- learning from approved/rejected drafts
- subreddit-specific style profiles
- auto-suggest links
- duplicate thread detection
- original-post suggestions

---

## High-Level Architecture

### Services
1. **Reddit Ingest Worker**
   - pulls new posts/comments from target subreddits
   - stores candidates

2. **Opportunity Scorer**
   - scores relevance + reply-worthiness
   - filters out low-quality opportunities

3. **Draft Generator**
   - sends selected opportunities + policy + reply bank to OpenClaw
   - receives candidate reply

4. **Approval Queue UI / Admin Panel**
   - shows thread context
   - shows recommended reply
   - approve / edit / reject

5. **Reddit Publisher**
   - posts approved reply through Reddit API
   - records response metadata

6. **Analytics / Logging Layer**
   - tracks subreddit, topic, upvotes, replies, click behavior if available

---

## Recommended Stack

### Backend
- **Next.js / Node.js** or **NestJS** for app/server
- **Postgres** for persistence
- **Prisma** ORM
- **Redis** for queues / cooldowns / locks

### Jobs / scheduling
- **BullMQ** or **Trigger.dev**

### Admin UI
- internal Next.js dashboard

### Reddit integration
- Reddit OAuth app + API client
- likely `snoowrap` or direct Reddit API wrapper

### OpenClaw integration
- call OpenClaw agent endpoint/session path to generate draft replies
- include subreddit style + reply bank + safety rules in prompt

---

## Core Data Model

### `reddit_sources`
- id
- subreddit_name
- enabled
- priority
- posting_allowed
- notes

### `reddit_threads`
- id
- reddit_id
- subreddit
- author
- title
- body
- url
- created_at
- score
- num_comments
- type (`post` | `comment` opportunity)
- raw_json

### `reply_candidates`
- id
- thread_id
- topic
- score_relevance
- score_risk
- score_link_fit
- status (`new`, `drafted`, `approved`, `rejected`, `posted`, `failed`)
- why_selected

### `reply_drafts`
- id
- candidate_id
- draft_text
- variant (`no_link`, `soft_mention`, `with_link`)
- source_article_url nullable
- generated_by
- generated_at
- approved_by nullable
- approved_at nullable
- edited_text nullable

### `posted_replies`
- id
- draft_id
- reddit_comment_id
- posted_at
- subreddit
- thread_url
- permalink
- initial_score
- current_score
- replies_count

### `policy_logs`
- id
- candidate_id
- check_name
- result
- reason

---

## Target Subreddits v1

- r/BabyLedWeaning
- r/NewParents
- r/beyondthebump

Optional later:
- r/Parenting
- r/toddlers

---

## Opportunity Detection Logic

### Trigger on:
- new posts in monitored subreddits
- optionally comments needing answers later

### Relevance keywords/topics
- baby led weaning
- BLW
- solids
- starting solids
- first foods
- 6 month old food
- puree / purée
- allergens
- egg introduction
- gagging / choking
- avocado / yogurt / banana / iron foods
- feeding schedule

### Ignore patterns
- purely emotional vents with no question
- medical emergency content
- low-information joke threads
- obvious trolling
- threads where a top-quality answer already exists and adding more adds no value

---

## Scoring Model

### Relevance score (0–100)
- keyword/topic match
- age-fit (6–12 months strongest)
- explicit feeding question
- request for resource/checklist/guide

### Risk score (0–100)
Higher risk if:
- allergy reaction reports
- choking incidents
- weight loss / refusal / medical concern
- explicit doctor contradiction

If risk too high:
- draft should be cautious or skip entirely

### Promo fit score (0–100)
Higher if:
- user explicitly asks for a guide/resource
- question maps to a specific blog post or food page

---

## Draft Generation Prompt Inputs

For each candidate send OpenClaw:
- subreddit name
- thread title/body
- top comments summary if useful
- topic classification
- style rules for that subreddit
- reply bank snippets
- allowed link targets
- safety rules
- output variants:
  - no-link
  - soft mention
  - with-link if appropriate

### Draft requirements
- human tone
- direct answer first
- no fake personal story
- no medical overclaim
- concise by default
- optional follow-up question to invite conversation

---

## Approval Workflow

### Queue view should show
- subreddit
- thread title
- author
- thread text snippet
- risk score
- why selected
- suggested variant(s)
- linked resource if any

### Actions
- approve as-is
- approve with edits
- reject
- snooze
- mark subreddit as avoid for similar topics

### Human review checklist
- useful?
- sounds human?
- too promotional?
- medically safe?
- link actually relevant?

---

## Posting Policy Engine

A reply can only be posted if all are true:
- subreddit is allowlisted
- daily posting cap not exceeded
- cooldown since last subreddit reply respected
- candidate is not high-risk medical content
- human approval present
- duplicate/similar recent reply not found

---

## Rate Limits / Safety Limits

### Initial limits
- max **3 posted replies/day** total
- max **1 reply/day/subreddit** for first 2 weeks
- minimum **90 minutes** between posted replies
- max **1 linked reply/day** initially

These are intentionally conservative.

---

## Link Selection Rules

### Preferred link order
1. exact blog post match
2. exact food page match
3. `/foods`
4. homepage only as last resort

### Never link when
- the question can be answered fully in-thread
- subreddit norms are anti-self-promo
- thread is emotionally sensitive or medical-risk heavy

---

## Admin Dashboard Screens

### 1. Opportunities
- incoming threads
- filters by subreddit / topic / score / risk

### 2. Draft Queue
- approve / edit / reject

### 3. Posted Replies
- track performance

### 4. Policy Settings
- subreddit allowlist
- rate limits
- link rules
- banned phrases

### 5. Knowledge Base
- reply bank
- approved best-performing replies
- topic templates

---

## MVP Build Plan

### Phase 1 — internal drafting only
- ingest threads
- score them
- generate drafts
- store in dashboard
- no posting yet

### Phase 2 — approval posting
- add approve/edit/reject
- post approved replies
- log outcomes

### Phase 3 — optimization
- better scoring
- subreddit-specific prompt tuning
- performance analytics

---

## Suggested Repo Structure

```txt
reddit-bot/
  apps/
    dashboard/
    worker/
  packages/
    reddit-client/
    scorer/
    drafting/
    policies/
    db/
  prisma/
  docs/
```

---

## OpenClaw Role in the System

OpenClaw should be used for:
- thread interpretation
- relevance judgment
- reply drafting
- soft CTA selection
- risk-aware phrasing

OpenClaw should NOT directly control posting without approval in v1.

---

## Example Candidate Flow

1. New post in r/BabyLedWeaning:
   - “My 6 month old gags on avocado. Is this normal?”
2. Ingest worker stores thread
3. Scorer tags topic: `gagging`, `first_foods`, `BLW`
4. Relevance 92 / Risk 28 / Link fit 41
5. Draft generator creates:
   - no-link answer
   - soft mention version
6. Dashboard shows draft
7. Lucas approves edited no-link version
8. Publisher posts reply
9. Metrics tracked for 7 days

---

## Recommendation

Build the MVP as:
- **Next.js dashboard + API**
- **Postgres + Prisma**
- **Redis + BullMQ**
- **Reddit API client**
- **OpenClaw drafting integration**

That’s the right long-term shape: practical now, extensible later.
