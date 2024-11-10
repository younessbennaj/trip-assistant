import { Params, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPinboardById } from "../../api/pinboard";
import DestinationCombobox from "../DestinationCombobox";
import { useState } from "react";

export async function loader({ params }: { params: Params<"id"> }) {
  return {
    pinboardId: params.id,
  };
}

function PinboardDetails() {
  const [place, setPlace] =
    useState<google.maps.places.AutocompletePrediction | null>(null);
  const { pinboardId } = useLoaderData() as { pinboardId: string };

  const {
    data: pinboardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pinboardData", pinboardId],
    queryFn: () => fetchPinboardById(pinboardId),
    enabled: !!pinboardId,
  });

  if (isLoading) {
    return <p>Chargement des données du pinboard...</p>;
  }

  if (isError || !pinboardData) {
    return <p>Erreur lors de la récupération des données du pinboard.</p>;
  }

  return (
    <div className="h-full">
      <div className="text-center mt-[200px] px-6 w-full md:max-w-[70%] lg:max-w-[50%] m-auto">
        <h2 className="text-4xl mb-4">Search for a place</h2>
        <p className="mb-6">
          Ready to explore <b>{pinboardData.location_name}</b>? Add a spot to
          your travel list.
        </p>

        <DestinationCombobox
          size="lg"
          value={place}
          onSelect={(place) => {
            setPlace(place);
          }}
        />
      </div>

      {/* <div className="grow bg-blue-100 h-full">Map Placeholder</div> */}
      {/* Exemple d'affichage */}
      {/* <Map
        style={{ width: "100%", height: "400px" }}
        defaultCenter={{
          lat: pinboardData.latitude,
          lng: pinboardData.longitude,
        }}
        defaultZoom={13}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      /> */}
    </div>
  );
}

export default PinboardDetails;