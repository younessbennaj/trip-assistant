export interface PinboardFormInputs {
  place: google.maps.places.AutocompletePrediction | null;
  startDate: string;
  endDate: string;
  pinboardName?: string;
}

export interface PinboardFormProps {
  onSubmit: (data: PinboardFormInputs) => void;
  isSubmitting: boolean;
}
