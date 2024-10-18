import * as Dialog from "@radix-ui/react-dialog";
import Button from "../Button";

interface ModalProps {
  title: string;
  description: string;
  children: React.ReactNode;
  triggerLabel: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function Modal({
  title,
  description,
  children,
  triggerLabel,
  isOpen,
  setIsOpen,
}: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button>{triggerLabel}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="fixed bg-white p-6 rounded-lg shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-full">
          <Dialog.Title className="text-xl font-semibold">{title}</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500">
            {description}
          </Dialog.Description>

          {/* The content of the modal */}
          {children}

          <Dialog.Close asChild>
            <button className="absolute top-2 right-2">Close</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
