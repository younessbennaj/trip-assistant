import { Link } from "react-router-dom";
import styles from "./PinboardCollection.module.css";

import { supabase } from "../../api";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/use-auth";

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
      <article className={styles.PinboardItem}>
        <img
          src={imageUrl}
          alt={`${city} view`}
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
        <div
          style={{
            padding: "1rem",
          }}
        >
          <header>
            <h2>{city}</h2>
            <p>Dates: {formattedDates}</p>
          </header>
          <p>Duration: {duration}</p>
        </div>
      </article>
    </Link>
  );
}

// interface Pinboard {
//   id: string;
//   city: string;
//   country: string;
//   latitude: number;
//   longitude: number;
//   start_date: string;
//   end_date: string;
//   duration: number;
//   created_at: string;
//   updated_at: string;
// }

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

  if (isLoading) {
    return <p>Loading pinboards...</p>;
  }

  if (error) {
    return <p>Error fetching pinboards: {error.message}</p>;
  }
  return (
    <main>
      <section aria-labelledby="pinboard-collection-heading">
        <h1 id="pinboard-collection-heading">Your Pinboards</h1>
        <p>
          Manage and organize your upcoming trips to different destinations.
        </p>

        <div className={styles.PinboardCollection}>
          {pinboards
            ? pinboards.map((pinboard) => (
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
            : null}
        </div>
      </section>
    </main>
  );
}

export default PinboardCollection;
