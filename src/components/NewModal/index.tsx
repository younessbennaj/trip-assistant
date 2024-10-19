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

function NewModal() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  console.log(["pinboards", session?.user.id]);

  // Define the mutation
  const { mutate, status } = useMutation({
    mutationFn: async (newPinboard: Pinboard) => {
      // miss country information
      const { data, error } = await supabase
        .from("pinboards")
        .insert([newPinboard])
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
      console.error("Error creating pinboard:", error.message);
    },
  });

  const handleCreatePinboard = (data: PinboardFormInputs) => {
    const adaptedData = {
      city: data.city.city,
      latitude: data.city.latitude,
      longitude: data.city.longitude,
      start_date: data.startDate, // Adapt startDate field
      end_date: data.endDate, // Adapt endDate field
      duration: dayjs(data.endDate).diff(dayjs(data.startDate), "day"), // Already the same
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
