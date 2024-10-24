import { supabase } from ".";
import { Pinboard } from "../components/PinboardCollection/types";

export const fetchPinboards = async (userId: string) => {
  const { data, error } = await supabase.rpc("get_pinboard_coordinates", {
    user_id: userId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as Pinboard[];
};
