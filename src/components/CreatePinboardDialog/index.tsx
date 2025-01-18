import dayjs from "dayjs";
import { PinboardFormInputs } from "../PinboardForm/types";
import { useAuth } from "../../hooks/use-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Pinboard } from "../PinboardCollection/types";
import { supabase } from "../../api";
import { toast } from "sonner";
import { useState } from "react";
import Dialog from "../Dialog";
import Button from "../Button";
import { PlusIcon } from "@heroicons/react/24/outline";
import PinboardForm from "../PinboardForm";

export interface PinboardSubmitData {
  name: string; // User-assigned or default pinboard name
  location_name: string; // Name of the location (e.g., city or landmark)
  place_id: string; // The 'POINT(longitude latitude)' string format for insertion in DB
  start_date: string;
  end_date: string;
  duration: number;
}

function CreatePinboardDialog() {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

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

  const handleCreatePinboard = (data: PinboardFormInputs) => {
    if (data.place) {
      const adaptedData = {
        place_id: data.place.place_id,
        name: data.pinboardName || "",
        location_name: data.place.description,
        start_date: data.startDate,
        end_date: data.endDate,
        duration: dayjs(data.endDate).diff(dayjs(data.startDate), "day"),
        user_id: session?.user.id,
      };
      mutate(adaptedData);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      description="Enter the details of your new pinboard"
      title="Create New Pinboard"
      trigger={
        <Button variant="ghost">
          <PlusIcon className="h-6 w-6" />
        </Button>
      }
    >
      <>
        <PinboardForm
          onSubmit={handleCreatePinboard}
          isSubmitting={status === "pending"}
        />
      </>
    </Dialog>
  );
}

export default CreatePinboardDialog;
