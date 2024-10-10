import { useEffect, useState } from "react";
import { City } from "./types";
import { supabase } from "../../api/auth";
import { useAuth } from "../../hooks/use-auth";

function CityAutocomplete() {
  const { session } = useAuth();
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState<{
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/api/cities");
        const data = await response.json();
        setCities(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  // fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error.message);
        return;
      }

      if (data) {
        setSelectedCity({
          city: data.city,
          country: data.country,
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    };

    if (session) {
      fetchUserProfile();
    }
  }, [session]);

  const updateUserProfile = async (city: City) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        city: city.city,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
      })
      .eq("id", session?.user.id);

    if (error) {
      console.error("Error updating profile:", error.message);
    } else {
      console.log("User profile updated successfully!");
    }
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { latitude, longitude } = JSON.parse(event.target.value);
    const city =
      cities.find(
        (city) => city.latitude === latitude && city.longitude === longitude,
      ) || null;
    setSelectedCity(city);

    if (city) {
      updateUserProfile(city);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div data-testid="home">
      <label htmlFor="city-select">Choose your currenty city:</label>
      <select
        id="city-select"
        data-testid="city-select"
        onChange={handleCityChange}
        value={
          selectedCity
            ? JSON.stringify({
                latitude: selectedCity.latitude,
                longitude: selectedCity.longitude,
              })
            : ""
        }
      >
        <option value="">--Please choose a city--</option>
        {cities.map((city, index) => (
          <option
            key={index}
            value={JSON.stringify({
              latitude: city.latitude,
              longitude: city.longitude,
            })}
          >
            {city.city}, {city.country}
          </option>
        ))}
      </select>

      {selectedCity && (
        <div data-testid="selected-city">
          <h2>Selected City:</h2>
          <p>
            <strong>
              {selectedCity.city}, {selectedCity.country}
            </strong>
          </p>
          <p>
            Latitude: {selectedCity.latitude}, Longitude:{" "}
            {selectedCity.longitude}
          </p>
        </div>
      )}
    </div>
  );
}

export default CityAutocomplete;
