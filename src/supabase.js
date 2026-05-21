import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  "https://zgwxenrgyfllxcbythwr.supabase.co";

const supabaseKey =
  "sb_publishable_Wvzz8wyR6EKCwQ6OcU0ImQ_YRYvNUwN";

export const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );