import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItemType } from "@/types";

export function CartItem({
  item,
  updateQuantity,
  removeItem,
}: {
  item: CartItemType;
  updateQuantity: (id: number, newQuantity: number) => void;
  removeItem: (id: number) => void;
}) {
  return (
    <Card key={item.productId}>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="relative">
            <Image
              src={item.product?.image || "/placeholder.svg"}
              alt={item.product?.title || ""}
              width={120}
              height={120}
              className="rounded-lg object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{item.product?.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeItem(item.productId)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">
                  ${item.product?.price}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                    className="h-8 w-8"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="px-3 py-1 min-w-[3rem] text-center">
                    {item.quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="h-8 w-8"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-right min-w-[4rem]">
                  <span className="font-semibold">
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
