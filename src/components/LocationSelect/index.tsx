import AsyncSelect from "react-select/async";
import { City } from "../CityAutocomplete/types";

async function fetchCities(query: string): Promise<City[]> {
  return fetch(`/api/cities?search=${query}`).then((response) =>
    response.json(),
  );
}

export interface CityOption extends City {
  value: string;
  label: string;
  isDisabled?: boolean;
}

function castCities(data: City[]): CityOption[] {
  return data.map((city) => ({
    value: JSON.stringify({
      latitude: city.latitude,
      longitude: city.longitude,
    }),
    label: city.city,
    isDisabled: false,
    ...city,
  }));
}

function loadOptions(
  inputValue: string,
  callback: (options: CityOption[]) => void,
) {
  console.log(inputValue);
  fetchCities(inputValue).then((data: City[]) => {
    callback(castCities(data));
  });
}

function LocationSelect({
  onChange,
}: {
  onChange: (item: CityOption) => void;
}) {
  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      onChange={(item) => onChange(item as CityOption)}
    />
  );
}
export default LocationSelect;