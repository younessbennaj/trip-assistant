import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/use-auth";
import SkeletonRectangle from "../SkeletonRectangle";
import PinboardItem from "../PinboardItem";
import { fetchPinboards } from "../../api/pinboard";
import NewModal from "../NewModal";

function PinboardCollection() {
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

  if (error) {
    return <p>Error fetching pinboards: {error.message}</p>;
  }

  return (
    <main>
      <section aria-labelledby="pinboard-collection-heading">
        <div className="flex items-center justify-start md:justify-between mb-10 flex-col md:flex-row">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl" id="pinboard-collection-heading">
              Your Pinboards
            </h1>
            <p className="text-sm">
              Manage and organize your upcoming trips to different destinations.
            </p>
          </div>
          <NewModal />
        </div>

        <div className="flex flex-col gap-6">
          {isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonRectangle key={index} height="246px" width="720px" />
              ))}
            </>
          ) : pinboards ? (
            pinboards.map((pinboard) => (
              <PinboardItem
                key={pinboard.id}
                city={pinboard.city}
                startDate={pinboard.start_date}
                endDate={pinboard.end_date}
                duration={`${pinboard.duration} days`}
                link={`/pinboards/${pinboard.id}`}
                imageUrl={`https://via.placeholder.com/400x300?text=${pinboard.city}`} // Placeholder for now
              />
            ))
          ) : (
            <p>You don't have any pinboards yet. </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default PinboardCollection;
