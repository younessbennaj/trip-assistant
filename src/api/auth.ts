import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co`,
  `${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
);

export async function signInWithEmail(credentials: {
  email: string;
  password: string;
}) {
  return supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });
}

export async function signUpWithEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return supabase.auth.signUp({
    email,
    password,
  });
}

export async function signOut() {
  await supabase.auth.signOut();
}
