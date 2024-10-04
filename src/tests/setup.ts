import "@testing-library/jest-dom/vitest";
import "@testing-library/jest-dom";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "../mocks/node";

beforeAll(() => {
  if (import.meta.env.VITE_NODE_ENV === "test") {
    server.listen();
  }
});

afterEach(() => server.resetHandlers());

afterAll(() => {
  server.close();
  cleanup();
});
