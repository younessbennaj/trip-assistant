import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CityAutocomplete from ".";
import cities from "../../mocks/data/cities.json";

describe.skip("CityAutocomplete", () => {
  it("renders the CityAutocomplete component and fetches cities", async () => {
    render(<CityAutocomplete />);

    // Vérifier que le message de chargement s'affiche au début
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Utiliser waitFor pour attendre que les villes soient récupérées
    await waitFor(() => {
      const citySelect = screen.getByTestId("city-select");
      expect(citySelect).toBeInTheDocument();
    });

    // Vérifier que les villes sont bien affichées dans le <select>
    cities.forEach((city) => {
      expect(screen.getByText(new RegExp(city.city, "i"))).toBeInTheDocument();
    });

    // Simuler une sélection de ville en utilisant l'index (puisque nous n'avons pas de champ 'id')
    fireEvent.change(screen.getByTestId("city-select"), {
      target: { value: "0" }, // Sélectionner la première ville (index 0)
    });

    // Vérifier que la ville sélectionnée s'affiche correctement
    expect(screen.getByTestId("selected-city")).toHaveTextContent(
      `${cities[0].city}, ${cities[0].country}`,
    );
  });
});
