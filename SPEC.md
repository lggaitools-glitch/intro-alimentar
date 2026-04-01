# IntroAlimentar — Baby Food Introduction Planner & Learning Hub

## Overview
A Next.js 15+ web app that guides parents through complementary feeding (alimentación complementaria) for babies starting at 6 months. Combines Spanish AEP guidelines with WHO and global best practices. Bilingual: Spanish (primary) + English.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **State:** localStorage for progress tracking (no backend needed initially)
- **Deployment:** Local dev first, Vercel-ready

## Core Features

### 1. 🏠 Dashboard / Home
- Baby profile setup (name, date of birth, feeding type: breast/formula/mixed)
- Current phase indicator (which week/month of introduction)
- Quick stats: foods tried, upcoming foods, allergens introduced
- Next recommended actions

### 2. 📋 Readiness Checklist
Before starting, parents confirm readiness signs (from AEP):
- [ ] Baby shows active interest in food
- [ ] Tongue-thrust reflex (extrusión) has disappeared
- [ ] Can grab food and bring to mouth
- [ ] Can sit with support (sedestación)
- Visual guide with illustrations for each sign

### 3. 🍽️ Feeding Approach Selector
Interactive quiz to help parents choose their approach:
- **Traditional (purées → textures)** — gradual texture progression
- **Baby-Led Weaning (BLW)** — baby self-feeds from start
- **Mixed/BLISS** — combination of both
- Each option explained with pros/cons from AEP document
- Recommendation based on family situation
- Can change approach anytime

### 4. 📅 Week-by-Week Food Introduction Plan
The core feature. A structured calendar/timeline:

#### Phase 1: Month 6 (Weeks 1-4)
- Start with single foods, one new food every 2-3 days
- Priority: iron-rich foods (meat, egg yolk, iron-fortified cereals)
- Vegetables: varied (avoid spinach/chard/borage first year or <20% of plate)
- Fruits: any, whole preferred over juice
- Cereals: rice, oats, corn (gluten intro around 6mo in small amounts)
- Format depends on chosen approach (purée vs BLW finger foods)

#### Phase 2: Months 7-8
- Increase variety and combinations
- Introduce gluten-containing cereals (wheat, barley)
- Legumes (lentils, chickpeas)
- Fish (avoiding large predator fish: swordfish, shark, bluefin tuna)
- Egg (well-cooked)
- Progress to lumpier textures by month 8-9

#### Phase 3: Months 9-12
- Yogurt and soft cheese from 9-10 months
- More complex combinations
- Transition to family meals (adapted)
- Self-feeding skills development

#### Phase 4: Months 12-24
- Whole cow's milk allowed
- Most family foods
- Still avoid: whole nuts (choking), honey before 12mo
- Minimize salt and sugar

For each food item, show:
- Name (ES + EN)
- Age range when safe to introduce
- Preparation tips for chosen approach (purée / BLW cuts)
- Nutritional highlights
- Allergen flag if applicable
- Safety warnings

### 5. 🥜 Allergen Tracker
Based on latest evidence (AEP + AAP 2024):
- No benefit to delaying allergens past 6 months
- Early introduction may reduce allergy risk
- Track introduction of top allergens:
  - Egg
  - Dairy (cow's milk protein)
  - Gluten/Wheat
  - Fish
  - Peanut/Tree nuts (as paste/powder, never whole)
  - Soy
  - Shellfish
  - Sesame
- 3-day observation window per allergen
- Reaction logging (none / mild / seek medical attention)
- Visual status: ✅ Introduced safely / ⏳ Pending / ⚠️ Reaction noted

### 6. 📖 Learning Center
Educational content organized as a course-like experience:

#### Module 1: Foundations
- What is complementary feeding?
- Why wait until ~6 months (neurological, renal, GI, immune maturity)
- Risks of too early (<4mo) and too late (>7mo) introduction
- Breastfeeding continues alongside (not replacement)

#### Module 2: Choosing Your Approach
- Traditional purée progression
- Baby-Led Weaning (BLW) explained
- BLISS (modified BLW with iron focus)
- Mixed approach
- Evidence comparison from AEP

#### Module 3: Nutrition Essentials
- Iron: why it's critical at 6mo, best sources (red meat, egg, lentils, fortified cereals)
- Zinc: importance and sources
- Vitamin D supplementation
- No salt before 12mo (<1g/day), no added sugar
- No honey before 12mo (botulism risk)
- No whole nuts until 3+ years (choking)
- Limit large predator fish (mercury)
- Avoid high-nitrate greens in year 1 (spinach, chard, borage)

#### Module 4: Safety
- Choking prevention rules
- High-risk foods list
- Safe food shapes/sizes for BLW
- First aid basics (link to resources)
- Always upright, supervised, no screens during meals

#### Module 5: Responsive Feeding (Alimentación Perceptiva)
- Baby decides HOW MUCH, parents decide WHAT/WHEN/WHERE
- Never force or pressure
- Don't use food as reward/punishment/emotional comfort
- Expect 10-15 exposures before acceptance
- Routine tips: calm environment, no screens, eat together

#### Module 6: Practical Tips
- Meal planning for busy parents
- How to adapt family meals for baby
- Eating out with baby
- Dealing with picky eating
- When to worry (growth, refusal patterns)

Each module has:
- Short lessons (3-5 min read)
- Key takeaways
- Progress tracking (completed/not)
- Quiz/check questions

### 7. 📓 Food Diary
- Log what baby ate each day
- Note reactions (skin, digestive, mood)
- Track which foods accepted/rejected
- Export capability for pediatrician visits

### 8. ⚠️ Quick Reference Cards
- Foods to AVOID by age
- Choking hazards list
- Emergency signs (when to call doctor)
- Daily feeding schedule template
- Portion size guide by age

## Data Model (localStorage)

```typescript
interface BabyProfile {
  name: string;
  dateOfBirth: string; // ISO date
  feedingType: 'breast' | 'formula' | 'mixed';
  approach: 'traditional' | 'blw' | 'mixed' | null;
  startDate: string | null; // when AC began
}

interface FoodEntry {
  id: string;
  foodId: string;
  date: string;
  reaction: 'none' | 'mild' | 'moderate' | 'severe';
  notes: string;
  accepted: boolean;
}

interface AllergenStatus {
  allergenId: string;
  introduced: boolean;
  dateIntroduced: string | null;
  reaction: 'none' | 'mild' | 'moderate' | 'severe' | null;
}

interface LearningProgress {
  moduleId: string;
  lessonsCompleted: string[];
  quizScore: number | null;
}
```

## Design
- Clean, warm, friendly UI (this is about babies!)
- Color palette: soft greens, warm oranges, cream backgrounds
- Mobile-first (parents will use this on phones)
- Card-based layouts
- Progress bars and visual indicators
- Emoji usage for food categories
- Responsive — works on phone, tablet, desktop

## Content Sources (already analyzed)
1. **AEP 2018 Document** (PDF) — Primary Spanish guidelines
   - When to start, readiness signs, food order, allergens, BLW, iron, safety
2. **WHO 2023 Guideline** — Global complementary feeding 6-23 months
3. **AAP 2024** — Early allergen introduction evidence
4. **ESPGHAN** — European guidelines (referenced in AEP doc)

## Key AEP Recommendations (hardcode these)
- Exclusive breastfeeding 6 months, then gradual food addition
- Maintain breastfeeding on demand throughout
- No rigid food order — prioritize iron-rich and zinc-rich foods
- Introduce one food at a time, few days apart
- No salt, no sugar, no sweeteners for babies
- Gluten: introduce between 4-11 months, ideally around 6mo, small amounts
- Allergens: no benefit to delaying past 6 months
- Avoid spinach/chard/borage <12mo or <20% of plate (nitrates)
- Avoid large predator fish (mercury): swordfish, shark, tuna, dogfish
- Yogurt/cheese from 9-10 months, whole cow's milk from 12 months
- Lumpy textures by 8-9 months (don't delay!)
- No whole nuts until 3+ years
- Responsive feeding: never force, respect hunger/satiety cues
- 4-5 meals/day as orientation
- Fruit juice offers no benefit over whole fruit

## File Structure
```
intro-alimentar/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx (dashboard)
│   │   ├── setup/page.tsx (baby profile)
│   │   ├── plan/page.tsx (week-by-week plan)
│   │   ├── allergens/page.tsx (allergen tracker)
│   │   ├── learn/page.tsx (learning center)
│   │   ├── learn/[moduleId]/page.tsx
│   │   ├── diary/page.tsx (food diary)
│   │   └── reference/page.tsx (quick reference)
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── ReadinessChecklist.tsx
│   │   ├── ApproachSelector.tsx
│   │   ├── FoodCard.tsx
│   │   ├── WeekPlan.tsx
│   │   ├── AllergenCard.tsx
│   │   ├── LessonCard.tsx
│   │   ├── FoodDiaryEntry.tsx
│   │   └── ProgressBar.tsx
│   ├── data/
│   │   ├── foods.ts (full food database with ES/EN)
│   │   ├── allergens.ts
│   │   ├── weekPlan.ts (week-by-week schedule)
│   │   ├── lessons.ts (learning content)
│   │   └── safetyTips.ts
│   ├── hooks/
│   │   ├── useProfile.ts
│   │   ├── useFoodDiary.ts
│   │   └── useLearningProgress.ts
│   └── lib/
│       ├── storage.ts (localStorage wrapper)
│       └── utils.ts
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

## Priority Order
1. Setup/Profile + Dashboard
2. Week-by-week food plan (core value)
3. Allergen tracker
4. Learning center with all modules
5. Food diary
6. Quick reference cards
7. Polish and deploy

## Important Notes
- ALL learning content must be based on the AEP document and WHO guidelines
- When in doubt, defer to AEP (Spanish authority)
- Include disclaimers: "This app is for informational purposes. Always consult your pediatrician."
- Content should be warm and reassuring — new parents are anxious enough!
