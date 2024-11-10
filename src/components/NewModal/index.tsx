import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import PinboardForm from "../PinboardForm";
import Button from "../Button";
import dayjs from "dayjs";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { PinboardFormInputs } from "../PinboardForm/types";
import { useAuth } from "../../hooks/use-auth";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pinboard } from "../PinboardCollection/types";
import { supabase } from "../../api";
import { toast } from "sonner";

export interface PinboardSubmitData {
  pinboard_name: string; // User-assigned or default pinboard name
  location_name: string; // Name of the location (e.g., city or landmark)
  location: string; // The 'POINT(longitude latitude)' string format for insertion in DB
  start_date: string;
  end_date: string;
  duration: number;
}

function NewModal() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const places = useMapsLibrary("places");

  const { mutate, status } = useMutation({
    mutationFn: async (newPinboardData: PinboardSubmitData) => {
      const { data, error } = await supabase
        .from("pinboards")
        .insert([newPinboardData])
        .select("*");

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: (newPinboard) => {
      queryClient.setQueryData(
        ["pinboards", session?.user.id],
        (oldPinboards: Pinboard[]) => {
          if (oldPinboards) {
            return [...oldPinboards, ...newPinboard];
          }
          return [newPinboard];
        },
      );
      setIsOpen(false);
      toast.success("Pinboard created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const getPlaceDetails = (placeId: string) => {
    return new Promise<google.maps.places.PlaceResult>((resolve, reject) => {
      if (!places) {
        reject(new Error("La bibliothèque Places n'est pas chargée."));
        return;
      }

      const service = new places.PlacesService(document.createElement("div"));
      service.getDetails({ placeId }, (result, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          if (result) {
            resolve(result);
          }
        } else {
          reject(
            new Error(
              `Erreur lors de la récupération des détails du lieu : ${status}`,
            ),
          );
        }
      });
    });
  };

  const handleCreatePinboard = (data: PinboardFormInputs) => {
    if (data.place) {
      getPlaceDetails(data.place.place_id).then((placeDetails) => {
        if (
          placeDetails &&
          placeDetails.geometry &&
          placeDetails.geometry.location
        ) {
          const adaptedData = {
            pinboard_name: placeDetails.name || data.pinboardName || "",
            location_name: placeDetails.name ? placeDetails.name : "",
            location: `POINT(${placeDetails.geometry.location.lng()} ${placeDetails.geometry.location.lat()})`,
            start_date: data.startDate,
            end_date: data.endDate,
            duration: dayjs(data.endDate).diff(dayjs(data.startDate), "day"),
            user_id: session?.user.id,
          };
          mutate(adaptedData);
        }
      });
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add new destination</Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="fixed bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <DialogTitle className="font-bold text-2xl">
              Create New Pinboard
            </DialogTitle>
            <Description className="mb-5">
              Enter the details of your new pinboard.
            </Description>
            <PinboardForm
              onSubmit={handleCreatePinboard}
              isSubmitting={status === "pending"}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

export default NewModal;
