import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/use-auth";
import SkeletonRectangle from "../SkeletonRectangle";
import PinboardItem from "../PinboardItem";
import { fetchPinboards } from "../../api/pinboard";
import { useMediaQuery } from "@uidotdev/usehooks";
import Input from "../Input";
import { useState } from "react";
import CreatePinboardDialog from "../CreatePinboardDialog";
import CreatePinboardMobileDrawer from "../CreatePinboardMobileDrawer";

function PinboardCollection() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { userId } = useAuth();
  const {
    data: pinboards,
    isLoading,
    error,
  } = useQuery({
    enabled: !!userId,
    queryKey: ["pinboards", userId],
    queryFn: () => (userId ? fetchPinboards(userId) : null),
  });

  const [query, setQuery] = useState("");

  if (error) {
    return <p>Error fetching pinboards: {error.message}</p>;
  }

  function handlePinboardCollectionSearch(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setQuery(event.target.value);
  }

  const filteredPinboards = pinboards?.filter((pinboard) => {
    return pinboard.location_name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="max-w-[980px] mx-auto">
      <section aria-labelledby="pinboard-collection-heading">
        <header className="flex mb-8">
          <Input
            className="grow"
            placeholder="Search your trips…"
            onChange={handlePinboardCollectionSearch}
          />

          {isSmallDevice ? (
            <CreatePinboardMobileDrawer />
          ) : (
            <CreatePinboardDialog />
          )}
        </header>
        <div className="flex flex-col gap-8">
          {isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonRectangle key={index} height="246px" width="720px" />
              ))}
            </>
          ) : filteredPinboards && filteredPinboards.length > 0 ? (
            filteredPinboards.map((pinboard) => (
              <PinboardItem
                key={pinboard.id}
                city={pinboard.location_name}
                startDate={pinboard.start_date}
                endDate={pinboard.end_date}
                duration={`${pinboard.duration} days`}
                link={`/pinboard/${pinboard.id}`}
              />
            ))
          ) : (
            <p>You don't have any pinboards yet. </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default PinboardCollection;
