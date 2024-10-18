import { useState } from "react";
import Modal from "../Modal";
import PinboardForm from "../PinboardForm";
import { supabase } from "../../api"; // Import Supabase client
import { useAuth } from "../../hooks/use-auth";

function CreateNewPinboardModal() {
  const { session } = useAuth(); // Get the session from the AuthProvider
  const [isOpen, setIsOpen] = useState(false); // Manage modal open state

  const handleCreatePinboard = async (data: {
    city: string;
    latitude: number;
    longitude: number;
    startDate: string;
    endDate: string;
    duration: number;
  }) => {
    try {
      const { error } = await supabase.from("pinboards").insert({
        city: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        start_date: data.startDate,
        end_date: data.endDate,
        duration: data.duration,
        user_id: session?.user.id,
      });

      if (error) {
        throw error;
      }

      console.log("Pinboard created successfully!");
      setIsOpen(false); // Close the modal on success
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error creating pinboard:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <Modal
      title="Create New Pinboard"
      description="Enter the details of your new pinboard."
      triggerLabel="Add new board"
      isOpen={isOpen}
      setIsOpen={setIsOpen} // Pass down the state to open/close modal
    >
      <PinboardForm onSubmit={handleCreatePinboard} />
    </Modal>
  );
}

export default CreateNewPinboardModal;
