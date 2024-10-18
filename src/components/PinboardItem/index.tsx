import dayjs from "dayjs";
import { Link } from "react-router-dom";

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

export default PinboardItem;
