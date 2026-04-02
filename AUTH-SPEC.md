# Auth + Cloud Sync Spec

## Goal
Add Supabase auth + database so user data persists across devices.

## Install
```
npm install @supabase/supabase-js @supabase/ssr
```

## Files to Create

### src/lib/supabase/client.ts
Browser-side Supabase client using createBrowserClient from @supabase/ssr.

### src/lib/supabase/server.ts  
Server-side Supabase client for SSR.

### .env.local.example
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### src/app/auth/page.tsx
Login/Signup page:
- Email + password sign up
- Email + password sign in
- Forgot password link
- Clean warm UI matching app style (soft greens, cream)
- Toggle between sign in / sign up modes

### src/app/auth/callback/route.ts
OAuth/email callback handler.

### src/components/AuthGuard.tsx
Wrapper component. If not logged in, redirect to /auth.

### src/hooks/useAuth.ts
Hook providing: user, loading, signIn, signUp, signOut, session.

### Navigation update
- Logged in: show user email, baby name if set, logout button
- Not logged in: show "Iniciar sesión" link
- Protect routes: /plan, /diary, /allergens, /learn, /setup, /approach, /readiness
- Keep public: /, /blog, /blog/[slug], /infographics, /reference

### src/lib/supabase/schema.sql
Full database schema with these tables:

**babies** - id (uuid pk), user_id (uuid ref auth.users), name (text), date_of_birth (date), feeding_type (text: breast/formula/mixed), approach (text: traditional/blw/mixed), start_date (date), created_at, updated_at

**food_diary** - id (uuid pk), user_id (uuid ref auth.users), baby_id (uuid ref babies), food_id (text), date (date), meal_time (text: breakfast/lunch/snack/dinner), reaction (text: none/mild/moderate/severe), accepted (bool), notes (text), created_at

**allergen_tracking** - id (uuid pk), user_id (uuid ref auth.users), baby_id (uuid ref babies), allergen_id (text), date_introduced (date), reaction (text), notes (text), created_at. Unique on (baby_id, allergen_id)

**learning_progress** - id (uuid pk), user_id (uuid ref auth.users), module_id (text), lesson_id (text), completed (bool), completed_at (timestamptz), created_at. Unique on (user_id, module_id, lesson_id)

**readiness_checks** - id (uuid pk), user_id (uuid ref auth.users), baby_id (uuid ref babies), check_id (text), checked (bool), checked_at. Unique on (baby_id, check_id)

ALL tables: enable RLS, policy "users can CRUD own data" using (auth.uid() = user_id).

### Update existing hooks
Pattern: if user logged in -> Supabase; if not -> localStorage (guest mode).
Update: useProfile.ts, useFoodDiary.ts, useAllergens.ts, useLearningProgress.ts

### src/components/DataMigration.tsx
After login, if localStorage has data, prompt: "Hemos detectado datos guardados en este dispositivo. Quieres vincularlos a tu cuenta?"
- Yes: migrate to Supabase, clear localStorage
- No: start fresh

## Important
- Build must pass (npm run build)
- App must work gracefully WITHOUT Supabase env vars (localStorage-only guest mode)
- Commit and push when done
