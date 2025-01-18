import { supabase } from ".";
import { Pinboard } from "../components/PinboardCollection/types";

export const fetchPinboards = async (userId: string) => {
  const { data, error } = await supabase
    .from("pinboards")
    .select("id, location_name, place_id, start_date, end_date, duration")
    .eq("user_id", userId)
    .order("start_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Pinboard[];
};

export async function fetchPinboardById(pinboardId: string) {
  try {
    const { data, error } = await supabase
      .from("pinboards")
      .select("id, location_name, place_id, start_date, end_date, duration")
      .eq("id", pinboardId)
      .single();

    if (error) {
      throw new Error(`Erreur de récupération du pinboard : ${error.message}`);
    }

    return data ? (data as Pinboard) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
