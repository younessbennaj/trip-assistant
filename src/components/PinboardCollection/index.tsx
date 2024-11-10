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
    <main className="max-w-[980px] mx-auto mt-[50px]">
      <section aria-labelledby="pinboard-collection-heading">
        <div className="flex md:items-center justify-start md:justify-between mb-10 flex-col md:flex-row">
          <div className="flex flex-col gap-1 mb-6 md:mb-0">
            <h1 className="text-2xl" id="pinboard-collection-heading">
              Your Pinboards
            </h1>
            <p className="text-sm">
              Manage and organize your upcoming trips to different destinations.
            </p>
          </div>
          <NewModal />
        </div>

        <div className="flex flex-col gap-8">
          {isLoading ? (
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonRectangle key={index} height="246px" width="720px" />
              ))}
            </>
          ) : pinboards && pinboards.length > 0 ? (
            pinboards.map((pinboard) => (
              <PinboardItem
                key={pinboard.id}
                city={pinboard.location_name}
                startDate={pinboard.start_date}
                endDate={pinboard.end_date}
                duration={`${pinboard.duration} days`}
                link={`/pinboard/${pinboard.id}`}
                imageUrl={`https://via.placeholder.com/400x300?text=${pinboard.location_name}`} // Placeholder for now
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
