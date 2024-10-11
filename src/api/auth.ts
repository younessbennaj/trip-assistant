import { supabase } from ".";

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
