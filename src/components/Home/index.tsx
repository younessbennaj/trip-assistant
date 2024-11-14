import { searchCategories } from "../../constants";
import DestinationCombobox from "../DestinationCombobox";

function Home() {
  return (
    <div className="h-full">
      <div className="mt-[200px] px-6 w-full md:max-w-[70%] m-auto">
        <div className="text-center">
          <h2 className="text-4xl mb-4">Search for a place</h2>
          <p className="mb-6">
            Ready to explore ? Add a spot to your travel list.
          </p>
        </div>

        <fieldset className="flex gap-4 justify-center mb-10">
          <div>
            <label className="cursor-pointer" htmlFor="all">
              All
            </label>
            <input checked type="checkbox" id="all" name="all" value="all" />
          </div>
          {searchCategories.map((category) => (
            <div key={category.value}>
              <label className="cursor-pointer" htmlFor={category.value}>
                {category.label}
              </label>
              <input
                type="checkbox"
                id={category.value}
                name={category.value}
                value={category.value}
              />
            </div>
          ))}
        </fieldset>

        <DestinationCombobox
          placeholder="Choose a city or locality"
          onSelect={(place) => {
            console.log(place);
          }}
        />
      </div>
    </div>
  );
}

export default Home;
