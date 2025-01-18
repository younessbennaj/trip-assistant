import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import { PinboardFormInputs, PinboardFormProps } from "./types";
import DestinationCombobox from "../DestinationCombobox";
import styles from "../Input/Input.module.css";

function PinboardForm({ isSubmitting, onSubmit }: PinboardFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PinboardFormInputs>({
    defaultValues: {
      place: null,
      startDate: "",
      endDate: "",
    },
  });

  const onSubmitHandler: SubmitHandler<PinboardFormInputs> = (data) => {
    console.log("data", data);
    onSubmit({ ...data });
  };

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div>
        <Controller
          name="place"
          control={control}
          rules={{ required: "Destination is required" }}
          render={({ field }) => (
            <DestinationCombobox
              placeholder="Paris, France"
              label="Choose a destination"
              onSelect={field.onChange}
            />
          )}
        />
        {errors.place && (
          <span className="text-red-500">{errors.place.message}</span>
        )}
      </div>
      <div>
        <label
          className="text-sm text-gray-700 text-bold mb-1"
          htmlFor="startDate"
        >
          Start date
        </label>
        <input
          className={styles.input}
          id="startDate"
          {...register("startDate", { required: true })}
          type="date"
          placeholder="20/09/2024"
        />
        {errors.startDate && (
          <span className="text-red-500">Start date is required</span>
        )}
      </div>
      <div>
        <label
          className="text-sm text-gray-700 text-bold mb-1"
          htmlFor="endDate"
        >
          End date
        </label>
        <input
          className={styles.input}
          id="endDate"
          {...register("endDate", { required: true })}
          placeholder="20/09/2024"
          type="date"
        />

        {errors.endDate && (
          <span className="text-red-500">End date is required</span>
        )}
      </div>
      <div className="flex md:justify-end">
        <Button
          className="w-full md:w-fit mt-10"
          disabled={isSubmitting}
          type="submit"
        >
          Create Pinboard
        </Button>
      </div>
    </form>
  );
}

export default PinboardForm;
