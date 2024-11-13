import { Params, useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPinboardById } from "../../api/pinboard";
import dayjs from "dayjs";
import { searchCategories } from "../../constants";
import { useApiIsLoaded, useMapsLibrary } from "@vis.gl/react-google-maps";
import PlaceCard from "../PlaceCard";

export async function loader({ params }: { params: Params<"id"> }) {
  return {
    pinboardId: params.id,
  };
}

function PinboardDetails() {
  const { pinboardId } = useLoaderData() as { pinboardId: string };
  const apiIsLoaded = useApiIsLoaded();
  const places = useMapsLibrary("places");

  // Fetch pinboard data
  const {
    data: pinboardData,
    isLoading: pinboardLoading,
    isError: pinboardError,
  } = useQuery({
    queryKey: ["pinboardData", pinboardId],
    queryFn: () => fetchPinboardById(pinboardId),
    enabled: !!pinboardId,
  });

  // Fetch nearby places
  const {
    data: dataPlaces,
    isLoading: placesLoading,
    isError: placesError,
  } = useQuery<google.maps.places.PlaceResult[]>({
    queryKey: ["nearbyPlaces", pinboardId],
    queryFn: async () => {
      if (!apiIsLoaded || !places || !pinboardData) {
        throw new Error("Required data not available");
      }

      const service = new places.PlacesService(document.createElement("div"));
      return new Promise<google.maps.places.PlaceResult[]>(
        (resolve, reject) => {
          service.nearbySearch(
            {
              location: {
                lat: pinboardData.latitude,
                lng: pinboardData.longitude,
              },
              radius: 1000, // Rayon de recherche en mètres
              type: "cafe",
            },
            (results, status) => {
              if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                results
              ) {
                resolve(results);
              } else {
                reject(new Error("No results found"));
              }
            },
          );
        },
      );
    },
    enabled: !!apiIsLoaded && !!places && !!pinboardData,
    staleTime: 24 * 60 * 60 * 1000, // Cache for 24 hours
  });

  const formattedDates = `${dayjs(pinboardData?.start_date).format("D MMM")} - ${dayjs(
    pinboardData?.end_date,
  ).format("D MMM 'YY")}`;

  if (pinboardLoading) return <p>Loading pinboard data...</p>;
  if (pinboardError || !pinboardData)
    return <p>Error loading pinboard data.</p>;

  return (
    <div className="h-full">
      <h2 className="text-3xl">{pinboardData.location_name}</h2>
      <div className="flex pb-10">
        <p className="text-sm md:text-base">{formattedDates}</p>
        <span className="mx-2">•</span>
        <p className="text-sm md:text-base">{pinboardData.duration} days</p>
      </div>
      {placesLoading ? (
        <p>Loading nearby places...</p>
      ) : placesError || !dataPlaces || dataPlaces.length === 0 ? (
        <p>No places found near this pinboard.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataPlaces.map((place) => (
            <PlaceCard key={place.place_id} place={place} />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-4">
        {searchCategories.map((category) => (
          <div key={category.label}>
            <h3>{category.label}</h3>
            <div>
              <p>Some cards here</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PinboardDetails;
