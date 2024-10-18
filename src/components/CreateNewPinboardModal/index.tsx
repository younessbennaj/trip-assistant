import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../api";
import Modal from "../Modal";
import PinboardForm from "../PinboardForm";
import React from "react";
import { toast } from "sonner";
import { useAuth } from "../../hooks/use-auth";
import dayjs from "dayjs";
import { PinboardFormInputs } from "../PinboardForm/types";
import { Pinboard } from "../PinboardCollection/types";

function CreateNewPinboardModal() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = React.useState(false);

  // Define the mutation
  const { mutate, status, isError, error } = useMutation({
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
      queryClient.setQueryData(["pinboards"], (oldPinboards: Pinboard[]) => {
        if (oldPinboards) {
          return [...oldPinboards, ...newPinboard]; // Append the new pinboard
        }
        return [newPinboard]; // In case there were no pinboards previously
      });
      setIsOpen(false); // Close the modal
      toast.success("Pinboard created successfully");
    },
    onError: (error) => {
      console.error("Error creating pinboard:", error.message);
    },
  });

  const handleCreatePinboard = (data: PinboardFormInputs) => {
    const adaptedData = {
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      start_date: data.startDate, // Adapt startDate field
      end_date: data.endDate, // Adapt endDate field
      duration: dayjs(data.endDate).diff(dayjs(data.startDate), "day"), // Already the same
      user_id: session?.user.id, // Set the user_id from the session
    };
    mutate(adaptedData); // Trigger the mutation
  };

  return (
    <Modal
      title="Create New Pinboard"
      description="Enter the details of your new pinboard."
      triggerLabel="Create new board"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <PinboardForm
        onSubmit={handleCreatePinboard}
        isSubmitting={status === "pending"}
      />
      {isError && <p>Error: {error?.message}</p>}
    </Modal>
  );
}

export default CreateNewPinboardModal;
