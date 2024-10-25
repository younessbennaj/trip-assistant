import { Params, useLoaderData } from "react-router-dom";
import { Map } from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";
import { fetchPinboardById } from "../../api/pinboard"; // Assure-toi que le chemin est correct

// Loader pour récupérer l'id du pinboard
export async function loader({ params }: { params: Params<"id"> }) {
  return {
    pinboardId: params.id,
  };
}

function PinboardDetails() {
  // Récupération de l'id du pinboard depuis le loader
  const { pinboardId } = useLoaderData() as { pinboardId: string };

  // Utilisation de TanStack Query pour récupérer les données du pinboard avec la dernière syntaxe
  const {
    data: pinboardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pinboardData", pinboardId],
    queryFn: () => fetchPinboardById(pinboardId),
    enabled: !!pinboardId, // N'exécute la requête que si `pinboardId` est défini
  });

  if (isLoading) {
    return <p>Chargement des données du pinboard...</p>;
  }

  if (isError || !pinboardData) {
    return <p>Erreur lors de la récupération des données du pinboard.</p>;
  }

  return (
    <div>
      <h2>Pinboard name: {pinboardData.pinboard_name}</h2>
      <p>Pinboard location: {pinboardData.location_name}</p>
      {/* Exemple d'affichage */}
      <Map
        style={{ width: "100%", height: "400px" }}
        defaultCenter={{
          lat: pinboardData.latitude,
          lng: pinboardData.longitude,
        }}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </div>
  );
}

export default PinboardDetails;
