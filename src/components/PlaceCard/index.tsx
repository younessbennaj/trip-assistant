import { StarIcon } from "@heroicons/react/24/outline";
import Button from "../Button";

function PlaceCard({ place }: { place: google.maps.places.PlaceResult }) {
  const renderPriceLevel = (level: number) => {
    return "$".repeat(level);
  };

  return (
    <div className="mx-auto w-full rounded-lg shadow-md overflow-hidden bg-white">
      {/* Image */}
      <div className="relative">
        {place.photos && place.photos.length > 0 ? (
          <img
            src={place.photos[0].getUrl()}
            alt="Place Image"
            className="w-full h-40 object-cover"
          />
        ) : (
          <img
            src={place.icon}
            alt="Default Icon"
            className="w-full h-40 object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Rating */}
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">{place.name}</h2>
          <div className="flex items-center text-yellow-500">
            <StarIcon className="w-5 h-5" />
            <span className="ml-1">{place.rating}</span>
            <span className="text-gray-500 text-sm ml-1">
              ({place.user_ratings_total})
            </span>
          </div>
        </div>

        {/* Price Level and Open Status */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-700">
            {place.price_level ? renderPriceLevel(place.price_level) : "N/A"}
          </span>
        </div>

        {/* Vicinity */}
        <p className="text-sm text-gray-600">{place.vicinity}</p>
      </div>

      {/* Action buttons */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <Button>Add to favorite</Button>
      </div>
    </div>
  );
}

export default PlaceCard;
