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
import { useMemo, useState } from "react";
import { City } from "../LocationSelect/types";
import debounce from "lodash/debounce";

async function fetchCities(query: string): Promise<City[]> {
  const response = await fetch(`/api/cities?search=${query}`);
  return await response.json();
}

export default function DestinationCombobox() {
  const [selected, setSelected] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>([]); // Store fetched cities

  // Debounce the API call to avoid sending too many requests
  const fetchDebouncedCities = useMemo(() => {
    return debounce(async (query: string) => {
      if (query !== "") {
        const data = await fetchCities(query);
        setCities(data);
      } else {
        setCities([]);
      }
    }, 300);
  }, []);

  const handleCityChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = event.target.value;
    fetchDebouncedCities(query);
  };

  return (
    <Field className="w-full">
      <Label className="text-sm text-gray-700 text-bold mb-1">
        Destination
      </Label>
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setCities([])}
        __demoMode
      >
        <div className="relative w-full">
          <ComboboxInput
            className={clsx(
              "py-1.5 pr-8 pl-3 text-sm/6 border border-gray-200 rounded-lg w-full",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
            )}
            displayValue={(city: City) => city?.city}
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
          {cities.map((city) => (
            <ComboboxOption
              key={city.city}
              value={city}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-100 hover:bg-gray-100 hover:cursor-pointer"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-gray-800">{city.city}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </Field>
  );
}
