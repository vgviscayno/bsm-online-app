import FillItemDetailsForm from "@/components/add-to-cart/form";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Dispatch, SetStateAction } from "react";
import { Props as AddToCartProps } from "./add-to-cart";

type Props = {
  product: AddToCartProps["product"];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  label: string;
};

export default function AddToCartDrawer({
  product,
  open,
  setOpen,
  label,
}: Props) {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          {label}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DialogTitle>
            Add <span className="capitalize">{product.name}</span> to Cart
          </DialogTitle>
          <DialogDescription>
            Add additional info here. Click Add to Cart when you&apos;re done.
          </DialogDescription>
        </DrawerHeader>
        {/* Form here */}
        <FillItemDetailsForm
          product={product}
          afterSubmit={() => {
            setOpen(false);
          }}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
