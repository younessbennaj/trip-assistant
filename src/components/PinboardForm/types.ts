export interface PinboardFormInputs {
  city: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  startDate: string;
  endDate: string;
}

export interface PinboardFormProps {
  onSubmit: (data: PinboardFormInputs) => void;
  isSubmitting: boolean;
}
