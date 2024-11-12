import * as DialogComponent from "@radix-ui/react-dialog";

function Dialog({
  onOpenChange,
  open,
  description,
  title,
  trigger,
  children,
}: {
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  trigger: React.ReactNode;
}) {
  return (
    <DialogComponent.Root onOpenChange={onOpenChange} open={open}>
      <DialogComponent.Trigger>{trigger}</DialogComponent.Trigger>
      <DialogComponent.Portal>
        <DialogComponent.Overlay className="fixed inset-0 bg-black/30" />
        <DialogComponent.Content className="bg-white fixed h-fit inset-2/4 -translate-x-2/4 -translate-y-1/2 p-6 rounded-lg shadow-lg max-w-md w-full">
          <DialogComponent.Title className="font-bold text-2xl">
            {title}
          </DialogComponent.Title>
          <DialogComponent.Description className="mb-5">
            {description}
          </DialogComponent.Description>
          {children}
        </DialogComponent.Content>
      </DialogComponent.Portal>
    </DialogComponent.Root>
  );
}

export default Dialog;
