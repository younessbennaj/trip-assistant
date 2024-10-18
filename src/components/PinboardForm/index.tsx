import { Controller, SubmitHandler, useForm } from "react-hook-form";
import dayjs from "dayjs";
import Button from "../Button";
import LocationSelect from "../LocationSelect";

interface PinboardFormInputs {
  city: string;
  latitude: number;
  longitude: number;
  startDate: string;
  endDate: string;
}

interface PinboardFormProps {
  onSubmit: (data: PinboardFormInputs & { duration: number }) => void;
}

function PinboardForm({ onSubmit }: PinboardFormProps) {
  const {
    register,
    handleSubmit,
    control, // Access control for Controller
    formState: { errors },
  } = useForm<PinboardFormInputs>();

  const onSubmitHandler: SubmitHandler<PinboardFormInputs> = (data) => {
    const duration = dayjs(data.endDate).diff(dayjs(data.startDate), "day");
    onSubmit({ ...data, duration });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City
        </label>
        <Controller
          name="city"
          control={control}
          rules={{ required: "City is required" }}
          render={({ field }) => (
            <LocationSelect
              onChange={(item) => {
                field.onChange(item.city); // Pass city name to the form
                field.onBlur();
              }}
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
        <Button type="submit">Create Pinboard</Button>
      </div>
    </form>
  );
}

export default PinboardForm;
