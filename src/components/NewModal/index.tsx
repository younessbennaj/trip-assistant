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

  // Define the mutation
  const { mutate, status } = useMutation({
    mutationFn: async (newPinboardData: PinboardSubmitData) => {
      // miss country information
      const { data, error } = await supabase
        .from("pinboards")
        .insert([newPinboardData])
        .select("*"); // Returning the new pinboard

      if (error) {
        throw new Error(error.message);
      }

      return data; // Return the newly created pinboard
    },
    onSuccess: (newPinboard) => {
      // Update the cache for the pinboards query
      queryClient.setQueryData(
        ["pinboards", session?.user.id],
        (oldPinboards: Pinboard[]) => {
          if (oldPinboards) {
            return [...oldPinboards, ...newPinboard]; // Append the new pinboard
          }
          return [newPinboard]; // In case there were no pinboards previously
        },
      );
      setIsOpen(false); // Close the modal
      toast.success("Pinboard created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreatePinboard = (data: PinboardFormInputs) => {
    const adaptedData = {
      pinboard_name: data.pinboardName || data.city.city, // Default to city name if no custom name
      location_name: data.city.city, // Name of the city
      location: `POINT(${data.city.longitude} ${data.city.latitude})`, // Format as 'POINT(longitude latitude)'
      start_date: data.startDate, // Adapt startDate field
      end_date: data.endDate, // Adapt endDate field
      duration: dayjs(data.endDate).diff(dayjs(data.startDate), "day"), // Calculate duration
      user_id: session?.user.id, // Set the user_id from the session
    };

    mutate(adaptedData); // Trigger the mutation
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
