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

export async function fetchPinboardById(pinboardId: string) {
  try {
    const { data, error } = await supabase.rpc(
      "get_pinboard_with_coordinates_by_id",
      {
        pinboard_id: pinboardId,
      },
    );

    if (error) {
      throw new Error(`Erreur de récupération du pinboard : ${error.message}`);
    }

    return data ? (data[0] as Pinboard) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
