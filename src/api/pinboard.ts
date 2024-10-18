import { supabase } from ".";

export const fetchPinboards = async (userId: string) => {
  const { data, error } = await supabase
    .from("pinboards")
    .select("id, city, country, start_date, end_date, duration")
    .eq("user_id", userId)
    .order("start_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
