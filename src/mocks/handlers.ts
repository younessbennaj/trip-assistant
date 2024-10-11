import { http, HttpResponse } from "msw";
import cities from "./data/cities.json";
import { City } from "../components/LocationSelect/types";

const getCities = {
  enabled: true,
  handler: http.get("/api/cities", ({ request }) => {
    // Extract the full URL from the request
    const fullUrl = new URL(request.url);

    // Extract the search query from the URL
    const searchParams = new URLSearchParams(fullUrl.search);
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    // Filter cities based on the search query
    const filteredCities = cities.filter((city) =>
      city.city.toLowerCase().includes(searchQuery),
    );

    return HttpResponse.json(filteredCities as City[]);
  }),
};

const mocks = [getCities];

export const handlers = [...mocks]
  .filter((mock) => mock.enabled)
  .map((mock) => mock.handler);
