import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button";
// import LocationSelect from "../LocationSelect";
import { PinboardFormInputs, PinboardFormProps } from "./types";
import DestinationCombobox from "../DestinationCombobox";

function PinboardForm({ isSubmitting, onSubmit }: PinboardFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PinboardFormInputs>({
    defaultValues: {
      city: {
        city: "",
      },
    },
  });

  const onSubmitHandler: SubmitHandler<PinboardFormInputs> = (data) => {
    onSubmit({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div>
        <Controller
          name="city"
          control={control}
          // rules={{ required: "city is required" }}
          render={({ field }) => (
            <DestinationCombobox
              value={field.value}
              onSelect={field.onChange}
            />
          )}
        />
        {errors.city && (
          <span className="text-red-500">{errors.city.message}</span>
        )}
      </div>
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Start date
        </label>
        <input
          id="date"
          {...register("startDate", { required: true })}
          type="date"
          placeholder="20/09/2024"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.startDate && (
          <span className="text-red-500">Start date is required</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          End date
        </label>
        <input
          {...register("endDate", { required: true })}
          placeholder="20/09/2024"
          type="date"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.endDate && (
          <span className="text-red-500">End date is required</span>
        )}
      </div>
      <div className="flex justify-end">
        <Button disabled={isSubmitting} type="submit">
          Create Pinboard
        </Button>
      </div>
    </form>
  );
}

export default PinboardForm;
