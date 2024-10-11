import { Link } from "react-router-dom";
import styles from "./PinboardCollection.module.css";

const pinboardCollectionData = [
  {
    city: "New York",
    dates: "Jan 1, 2025 - Jan 10, 2025",
    duration: "10 days",
    link: "/pinboards/new-york",
    imageUrl: "https://via.placeholder.com/400x300?text=New+York",
  },
  {
    city: "Tokyo",
    dates: "Feb 15, 2025 - Mar 1, 2025",
    duration: "14 days",
    link: "/pinboards/tokyo",
    imageUrl: "https://via.placeholder.com/400x300?text=Tokyo",
  },
  {
    city: "Paris",
    dates: "Mar 5, 2025 - Mar 15, 2025",
    duration: "10 days",
    link: "/pinboards/paris",
    imageUrl: "https://via.placeholder.com/400x300?text=Paris",
  },
];

interface PinboardItemProps {
  city: string;
  dates: string;
  duration: string;
  link: string;
  imageUrl: string;
}

function PinboardItem({
  city,
  dates,
  duration,
  link,
  imageUrl,
}: PinboardItemProps) {
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
            <p>Dates: {dates}</p>
          </header>
          <p>Duration: {duration}</p>
        </div>
      </article>
    </Link>
  );
}

function PinboardCollection() {
  return (
    <main>
      <section aria-labelledby="pinboard-collection-heading">
        <h1 id="pinboard-collection-heading">Your Pinboards</h1>
        <p>
          Manage and organize your upcoming trips to different destinations.
        </p>

        <div className={styles.PinboardCollection}>
          {pinboardCollectionData.map((pinboard, index) => (
            <PinboardItem
              key={index}
              city={pinboard.city}
              dates={pinboard.dates}
              duration={pinboard.duration}
              link={pinboard.link}
              imageUrl={pinboard.imageUrl}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default PinboardCollection;
