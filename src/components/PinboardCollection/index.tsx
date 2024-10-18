import { Link } from "react-router-dom";

import { supabase } from "../../api";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/use-auth";
import CreateNewPinboardModal from "../CreateNewPinboardModal";
import SkeletonRectangle from "../SkeletonRectangle";

interface PinboardItemProps {
  city: string;
  startDate: string;
  endDate: string;
  duration: string;
  link: string;
  imageUrl: string;
}

function PinboardItem({
  city,
  startDate,
  endDate,
  duration,
  link,
  imageUrl,
}: PinboardItemProps) {
  const formattedDates = `${dayjs(startDate).format("D MMM")} - ${dayjs(endDate).format("D MMM 'YY")}`;
  return (
    <Link to={link}>
      <article className="shadow-lg rounded-lg overflow-hidden">
        <img
          src={imageUrl}
          alt={`${city} view`}
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
        <div className="p-4 flex flex-col gap-2">
          <header>
            <h2 className="text-2xl font-bold">{city}</h2>
          </header>
          <div className="flex">
            <p className="text-sm">{formattedDates}</p>
            <span className="mx-2">•</span>
            <p className="text-sm">{duration}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

const fetchPinboards = async (userId: string) => {
  const { data, error } = await supabase
    .from("pinboards")
    .select("id, city, country, start_date, end_date, duration")
    .eq("user_id", userId) // Fetch pinboards based on the user's ID
    .order("start_date", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

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

          <CreateNewPinboardModal />
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
