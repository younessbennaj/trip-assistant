import { PlusIcon } from "@heroicons/react/24/outline";
import Button from "../Button";
import MobileDrawer from "../MobileDrawer";
import PinboardForm from "../PinboardForm";

function CreatePinboardMobileDrawer() {
  return (
    <MobileDrawer
      trigger={
        <Button variant="ghost">
          <PlusIcon className="h-6 w-6" />
        </Button>
      }
    >
      <div className="p-4 bg-white rounded-t-[16px]">
        <div
          aria-hidden
          className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8"
        />
        <PinboardForm
          onSubmit={() => console.log("Submit")}
          isSubmitting={false}
        />
      </div>
    </MobileDrawer>
  );
}

export default CreatePinboardMobileDrawer;
