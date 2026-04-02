-- IntroAlimentar Database Schema
-- Run this in your Supabase SQL editor

-- Babies table
create table if not exists babies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  date_of_birth date not null,
  feeding_type text check (feeding_type in ('breast', 'formula', 'mixed')) not null default 'breast',
  approach text check (approach in ('traditional', 'blw', 'mixed')),
  start_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table babies enable row level security;

create policy "users can CRUD own babies"
  on babies for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Food diary table
create table if not exists food_diary (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  baby_id uuid references babies(id) on delete cascade not null,
  food_id text not null,
  food_name text not null,
  date date not null,
  meal_time text check (meal_time in ('breakfast', 'lunch', 'snack', 'dinner')),
  reaction text check (reaction in ('none', 'mild', 'moderate', 'severe')) not null default 'none',
  accepted boolean not null default true,
  notes text default '',
  created_at timestamptz default now()
);

alter table food_diary enable row level security;

create policy "users can CRUD own food_diary"
  on food_diary for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Allergen tracking table
create table if not exists allergen_tracking (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  baby_id uuid references babies(id) on delete cascade not null,
  allergen_id text not null,
  date_introduced date,
  reaction text check (reaction in ('none', 'mild', 'moderate', 'severe')),
  notes text default '',
  created_at timestamptz default now(),
  unique (baby_id, allergen_id)
);

alter table allergen_tracking enable row level security;

create policy "users can CRUD own allergen_tracking"
  on allergen_tracking for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Learning progress table
create table if not exists learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  module_id text not null,
  lesson_id text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique (user_id, module_id, lesson_id)
);

alter table learning_progress enable row level security;

create policy "users can CRUD own learning_progress"
  on learning_progress for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Readiness checks table
create table if not exists readiness_checks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  baby_id uuid references babies(id) on delete cascade not null,
  check_id text not null,
  checked boolean not null default false,
  checked_at timestamptz,
  unique (baby_id, check_id)
);

alter table readiness_checks enable row level security;

create policy "users can CRUD own readiness_checks"
  on readiness_checks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Updated_at trigger function
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger babies_updated_at
  before update on babies
  for each row execute function update_updated_at();
