-- 1) USERS
CREATE TABLE IF NOT EXISTS users (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT        NOT NULL UNIQUE,
  first_name    TEXT        NOT NULL,
  last_name     TEXT        NOT NULL,
  role          TEXT        NOT NULL CHECK (role IN ('client','trainer','admin')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2) EXERCISES
CREATE TABLE IF NOT EXISTS exercises (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT        NOT NULL UNIQUE,
  description  TEXT,
  video_url    TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3) WORKOUT_TEMPLATES
CREATE TABLE IF NOT EXISTS workout_templates (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  trainer_id  UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4) TEMPLATE_EXERCISES (join table)
CREATE TABLE IF NOT EXISTS template_exercises (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id  UUID        NOT NULL REFERENCES workout_templates(id) ON DELETE CASCADE,
  exercise_id  UUID        NOT NULL REFERENCES exercises(id),
  sets         INT         NOT NULL,
  reps         INT         NOT NULL,
  order_index  INT         NOT NULL
);

-- 5) USER_WORKOUTS
CREATE TABLE IF NOT EXISTS user_workouts (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  template_id UUID        REFERENCES workout_templates(id),
  date        DATE        NOT NULL DEFAULT CURRENT_DATE,
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6) USER_WORKOUT_EXERCISES
CREATE TABLE IF NOT EXISTS user_workout_exercises (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  workout_id      UUID        NOT NULL REFERENCES user_workouts(id) ON DELETE CASCADE,
  exercise_id     UUID        NOT NULL REFERENCES exercises(id),
  sets_completed  INT         NOT NULL,
  reps_per_set    TEXT        NOT NULL,     -- store JSON array like "[12,10,8]"
  weight_per_set  TEXT,                    -- store JSON array or NULL
  notes           TEXT
);
