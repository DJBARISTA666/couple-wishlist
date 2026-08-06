import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    "Не заданы переменные окружения SUPABASE_URL и/или SUPABASE_SERVICE_ROLE_KEY. " +
      "Добавь их в .env.local (для локальной разработки) и в настройках проекта на Vercel (Settings -> Environment Variables), " +
      "затем сделай redeploy."
  );
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
  },
});
