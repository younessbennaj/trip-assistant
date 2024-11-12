import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
import { PinboardFormInputs, PinboardFormProps } from "./types";
import DestinationCombobox from "../DestinationCombobox";
import Input from "../Input";

function PinboardForm({ isSubmitting, onSubmit }: PinboardFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PinboardFormInputs>({
    defaultValues: {
      place: null,
    },
  });

  const onSubmitHandler: SubmitHandler<PinboardFormInputs> = (data) => {
    console.log(data);
    return;
    onSubmit({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <Input
        label="Name your pinboard"
        placeholder="My next adventure"
        id="pinboardName"
        {...register("pinboardName", { required: true })}
        type="text"
      />
      {errors.pinboardName && (
        <span className="text-red-500">Start date is required</span>
      )}
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
        <Input
          label="Start date"
          id="date"
          {...register("startDate", { required: true })}
          type="date"
          placeholder="20/09/2024"
        />
        {errors.startDate && (
          <span className="text-red-500">Start date is required</span>
        )}
      </div>
      <div>
        <Input
          label="End date"
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
