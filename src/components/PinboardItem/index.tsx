import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface PinboardItemProps {
  city: string;
  startDate: string;
  endDate: string;
  duration: string;
  link: string;
}

function PinboardItem({
  city,
  startDate,
  endDate,
  duration,
  link,
}: PinboardItemProps) {
  const formattedDates = `${dayjs(startDate).format("D MMM")} - ${dayjs(endDate).format("D MMM 'YY")}`;
  return (
    <Link to={link}>
      <article className="shadow-xl rounded-xl overflow-hidden flex flex-col md:flex-row border-t border-gray-100">
        <div className="py-4 px-6 md:py-6 md:px-8 flex flex-col gap-2 grow">
          <header>
            <h4 className="text-3xl md:text-3xl text-gray-700">{city}</h4>
          </header>
          <div className="flex">
            <p className="text-sm md:text-base">{formattedDates}</p>
            <span className="mx-2">•</span>
            <p className="text-sm md:text-base">{duration}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default PinboardItem;
