import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types.ts";
import "jsr:@std/dotenv/load";

const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") as string;

export const supabaseClient = createClient<Database>(
  supabaseUrl!,
  supabaseAnonKey!,
);
