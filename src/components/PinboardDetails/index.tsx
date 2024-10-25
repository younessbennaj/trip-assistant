import { Params, useLoaderData } from "react-router-dom";

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
    </div>
  );
}

export default PinboardDetails;
