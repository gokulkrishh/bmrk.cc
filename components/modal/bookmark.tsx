import AddBookmarkInput from 'components/bookmark/add-input';
import { useMediaQuery } from 'components/hooks/useMediaQuery';
import { Dialog, DialogContent } from 'components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader } from 'components/ui/drawer';

type AddBookmarkProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function AddBookmark({ open, setOpen }: AddBookmarkProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-md py-2 px-2 max-sm:w-[calc(100%-30px)]">
          <AddBookmarkInput
            btnClassname="mx-1"
            onDone={() => {
              setOpen(false);
            }}
            className="!border-none"
          />
        </DialogContent>
      </Dialog>
    );
  } else {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <AddBookmarkInput
            btnClassname="mx-1"
            onDone={() => {
              setOpen(false);
            }}
            className="!border-none"
          />
        </DrawerContent>
      </Drawer>
    );
  }
}
