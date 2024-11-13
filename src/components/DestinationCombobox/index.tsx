import { useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";
import Combobox from "../Combobox";

export default function DestinationCombobox({
  label,
  placeholder,
  onSelect,
}: {
  label?: string;
  placeholder?: string;
  onSelect: (place: google.maps.places.AutocompletePrediction) => void;
}) {
  const places = useMapsLibrary("places");
  const [query, setQuery] = useState("");

  const { data: suggestions } = useQuery({
    enabled: !!query && query.length > 3,
    queryKey: ["suggestions", query],
    queryFn: async () => {
      if (places) {
        const autocompleteService = new places.AutocompleteService();
        return new Promise<google.maps.places.AutocompletePrediction[]>(
          (resolve, reject) => {
            autocompleteService.getPlacePredictions(
              { input: query, types: ["(cities)"] },
              (predictions, status) => {
                if (
                  status === google.maps.places.PlacesServiceStatus.OK &&
                  predictions
                ) {
                  resolve(predictions);
                } else {
                  reject(new Error("Failed to fetch suggestions"));
                }
              },
            );
          },
        );
      } else {
        return [];
      }
    },
    staleTime: 24 * 60 * 60 * 1000,
    gcTime: 25 * 60 * 60 * 1000,
  });

  const handleCityChange = async (query: string) => {
    setQuery(query);
  };

  return (
    <Combobox<google.maps.places.AutocompletePrediction>
      getOptionLabel={(option) => option.description}
      label={label}
      placeholder={placeholder}
      suggestions={suggestions ? suggestions : []}
      onChange={handleCityChange}
      onSelectedItemChange={(selectedItem) => {
        if (selectedItem) {
          onSelect(selectedItem);
        }
      }}
    />
  );
}
