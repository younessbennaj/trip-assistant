import AsyncSelect from "react-select/async";
import { City } from "../CityAutocomplete/types";

async function fetchCities(query: string): Promise<City[]> {
  return fetch(`/api/cities?search=${query}`).then((response) =>
    response.json(),
  );
}

export interface CityOption {
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

function LocationSelect() {
  return <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions />;
}
export default LocationSelect;
