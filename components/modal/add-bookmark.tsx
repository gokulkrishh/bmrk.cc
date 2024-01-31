import AddBookmarkInput from 'components/bookmark/add-input';
import { Dialog, DialogContent } from 'components/ui/dialog';

type AddBookmarkProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function AddBookmark({ open, setOpen }: AddBookmarkProps) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:max-w-md py-2 px-2">
        <AddBookmarkInput
          btnClassname="mx-0.5 relative -bottom-1.5"
          onHide={() => {
            setOpen(false);
          }}
          className="!border-none px-0"
        />
      </DialogContent>
    </Dialog>
  );
}
