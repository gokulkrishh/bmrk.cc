import AddBookmarkInput from 'components/bookmark/add-input';
import { Dialog, DialogContent } from 'components/ui/dialog';

type AddBookmarkProps = {
  open: boolean;
  onHide: (open: boolean) => void;
};

export default function AddBookmark({ open, onHide }: AddBookmarkProps) {
  return (
    <Dialog open={open} onOpenChange={() => onHide(false)}>
      <DialogContent className="sm:max-w-md py-2 px-2">
        <AddBookmarkInput
          btnClassname="mx-0.5 relative -bottom-1.5"
          onHide={() => {
            onHide(false);
          }}
          className="!border-none px-0"
        />
      </DialogContent>
    </Dialog>
  );
}
