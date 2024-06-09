import FillItemDetailsForm from "@/components/add-to-cart/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";
import { Props as AddToCartProps } from "./add-to-cart";

type Props = {
  product: AddToCartProps["product"];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  label: string;
};

export default function AddToCartDialog({
  product,
  open,
  setOpen,
  label,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Add <span className="capitalize">{product.name}</span> to Cart
          </DialogTitle>
          <DialogDescription>
            Add additional info here. Click Add to Cart when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        {/* Form here */}
        <FillItemDetailsForm
          product={product}
          afterSubmit={() => {
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
