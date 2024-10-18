import AsyncSelect from "react-select/async";
import styles from "../Input/Input.module.css";
import { City } from "./types";

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

// mapCityToCityOptions()
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
  fetchCities(inputValue).then((data: City[]) => {
    callback(castCities(data));
  });
}

function LocationSelect({
  onChange,
  initialCity,
}: {
  onChange: (item: CityOption) => void;
  initialCity?: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  } | null;
}) {
  const defaultCity = initialCity
    ? {
        value: JSON.stringify({
          latitude: initialCity.latitude,
          longitude: initialCity.longitude,
        }),
        label: `${initialCity.city}, ${initialCity.country}`,
        latitude: initialCity.latitude,
        longitude: initialCity.longitude,
        city: initialCity.city,
        country: initialCity.country,
      }
    : null;
  return (
    <div className={styles.wrapper}>
      {/* <label htmlFor="location">Choose your currenty city:</label> */}
      <AsyncSelect
        id="location"
        cacheOptions
        loadOptions={loadOptions}
        defaultOptions
        defaultValue={defaultCity}
        onChange={(item) => onChange(item as CityOption)}
      />
    </div>
  );
}
export default LocationSelect;
