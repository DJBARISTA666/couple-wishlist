-- Схема для Couple Wishlist
-- Выполнить целиком в Supabase Dashboard -> SQL Editor -> New query -> Run

create extension if not exists pgcrypto;

-- На случай, если таблицы уже были созданы раньше (например, с неправильным
-- регистром колонок) - сносим их, чтобы создать заново с нуля.
-- Если в них уже есть важные данные, которые жалко терять - закомментируй
-- эти строки и разберись с колонками вручную.
drop table if exists read_notifications cascade;
drop table if exists notifications cascade;
drop table if exists goals cascade;
drop table if exists wishes cascade;
drop table if exists users cascade;

-- Пользователи (тот, кто "зарегистрировался", введя имя)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  "coupleId" uuid,
  "coupleCode" text,
  "partnerId" uuid,
  "partnerName" text
);

-- Желания
create table if not exists wishes (
  id uuid primary key default gen_random_uuid(),
  emoji text,
  title text not null,
  price text,
  url text,
  completed boolean not null default false,
  priority text not null default 'medium',
  "ownerId" uuid not null
);

-- Общие цели/мечты (копилки)
create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  emoji text,
  title text not null,
  image text,
  "targetAmount" numeric not null default 0,
  contributions jsonb not null default '[]'::jsonb,
  "ownerId" uuid not null,
  "ownerName" text,
  "coupleId" uuid
);

-- Уведомления
create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  "createdAt" timestamptz not null default now(),
  text text not null,
  "coupleId" uuid not null,
  "targetUserId" uuid
);

-- Отметки "прочитано" по уведомлениям
create table if not exists read_notifications (
  id uuid primary key default gen_random_uuid(),
  "userId" uuid not null,
  "notificationId" uuid not null,
  unique ("userId", "notificationId")
);

-- Индексы для более быстрых выборок
create index if not exists idx_wishes_owner on wishes ("ownerId");
create index if not exists idx_goals_couple on goals ("coupleId");
create index if not exists idx_notifications_couple on notifications ("coupleId");
create index if not exists idx_read_notifications_user on read_notifications ("userId");

-- Все запросы к базе идут только с сервера (Next.js API routes) через
-- service_role ключ, который игнорирует RLS. Поэтому RLS можно не включать.
-- Но для подстраховки (на случай, если кто-то узнает anon key) закрываем
-- прямой публичный доступ к таблицам через анонимный ключ:
alter table users enable row level security;
alter table wishes enable row level security;
alter table goals enable row level security;
alter table notifications enable row level security;
alter table read_notifications enable row level security;
-- Никаких policy не создаём - значит доступ по anon/authenticated ключу
-- запрещён по умолчанию, а service_role по-прежнему имеет полный доступ.
