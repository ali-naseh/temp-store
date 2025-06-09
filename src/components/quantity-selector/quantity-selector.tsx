import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useAddCardItem } from "@/api/add-cart-item";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export function QuantitySelector({ productId }: { productId: number }) {
  const {
    addItem,
    isInCart,
    updateQuantity: updateInCartQuantity,
    getItemQuantity,
  } = useCart();

  const { user } = useAuth();
  const [quantity, setQuantity] = useState<number>(0);

  const { mutate: addCartItemApi } = useAddCardItem({
    onSuccess: (data) => {
      data.products.map((currProdcut) => addItem(currProdcut.productId));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    setQuantity(isInCart(productId) ? getItemQuantity(productId) : 1);
  }, [isInCart(productId)]);

  const updateQuantity = (mode: "remove" | "add") => {
    setQuantity((prev) => {
      const newVal = mode === "add" ? prev + 1 : prev - 1;
      updateInCartQuantity(productId, newVal);
      return newVal;
    });
  };
  return (
    <div className="w-full">
      {isInCart(productId) && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateQuantity("remove")}
            disabled={quantity <= 0}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateQuantity("add")}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
      {!isInCart(productId) && (
        <Button
          className="w-full"
          onClick={() =>
            addCartItemApi({
              userId: user?.id || 0,
              products: [{ productId: productId, quantity: 1 }],
            })
          }
        >
          Add To Cart
        </Button>
      )}
    </div>
  );
}
