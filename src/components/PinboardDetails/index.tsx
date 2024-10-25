import { Params, useLoaderData } from "react-router-dom";
import { Map } from "@vis.gl/react-google-maps";

export async function loader({ params }: { params: Params<"id"> }) {
  return {
    pinboardId: params.id,
  };
}

function PinboardDetails() {
  const { pinboardId } = useLoaderData() as { pinboardId: string };

  return (
    <div>
      <h1>PinboardDetails with id: {pinboardId}</h1>
      <Map
        style={{ width: "100%", height: "400px" }}
        defaultCenter={{ lat: 35.6895, lng: 139.6917 }}
        defaultZoom={10}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </div>
  );
}

export default PinboardDetails;
