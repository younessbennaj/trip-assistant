import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Field,
  Label,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";

export default function DestinationCombobox({
  label,
  value,
  onSelect,
  size,
}: {
  label?: string;
  value: google.maps.places.AutocompletePrediction | null;
  onSelect: (place: google.maps.places.AutocompletePrediction) => void;
  size?: "sm" | "md" | "lg";
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
              { input: query },
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

  const handleCityChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
  };

  return (
    <Field className="w-full">
      {label ? (
        <Label className="text-sm text-gray-700 text-bold mb-1">{label}</Label>
      ) : null}
      <Combobox
        value={value}
        onChange={(suggestion) => {
          if (suggestion) {
            onSelect(suggestion);
          }
        }}
      >
        <div className="relative w-full">
          <ComboboxInput
            className={clsx(
              "py-1.5 pr-8 pl-3 text-sm/6 border border-gray-200 rounded-lg w-full",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
              size === "lg" && "py-3 pr-10 pl-6 text-lg/6",
            )}
            displayValue={(
              suggestion: google.maps.places.AutocompletePrediction,
            ) => suggestion?.description}
            onChange={handleCityChange}
          />
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            "w-[var(--input-width)] rounded-xl border border-gray-200 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible",
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          )}
        >
          {suggestions
            ? suggestions.map((suggestion) => (
                <ComboboxOption
                  key={suggestion.place_id}
                  value={suggestion}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 hover:bg-gray-100 hover:cursor-pointer"
                >
                  <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                  <div className="text-sm/6 text-gray-800">
                    {suggestion.description}
                  </div>
                </ComboboxOption>
              ))
            : null}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}
