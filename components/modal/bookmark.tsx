import AddBookmarkInput from 'components/bookmark/add-input';
import { Dialog, DialogContent } from 'components/ui/dialog';

type AddBookmarkProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function AddBookmark({ open, setOpen }: AddBookmarkProps) {
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="sm:max-w-md py-0 px-2">
        <AddBookmarkInput
          onDone={() => {
            setOpen(false);
          }}
          className="!border-none"
        />
      </DialogContent>
    </Dialog>
  );
}
