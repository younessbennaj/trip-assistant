import { http, HttpResponse } from "msw";
import cities from "./data/cities.json";
import { City } from "../components/CityAutocomplete/types";

const getCities = {
  enabled: true,
  handler: http.get("/api/cities", () => {
    return HttpResponse.json(cities as City[]);
  }),
};

const mocks = [getCities];

export const handlers = [...mocks]
  .filter((mock) => mock.enabled)
  .map((mock) => mock.handler);
