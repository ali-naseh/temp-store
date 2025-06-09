// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/ui/collapsible";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import { CATEGORIES } from "@/constants/categories";
// import { useProducts } from "@/hooks/use-products";
// import { ChevronDown, Star } from "lucide-react";
// import { useState } from "react";

// export function FilterSidebar() {
//   const { filterProducts, clearFilters, filters } = useProducts();
//   const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
//   return (
//     <div className="space-y-6">
//       <div>
//         <h3 className="font-semibold mb-4">Price Range</h3>
//         <div className="space-y-4 mb-2">
//           <Slider
//             value={priceRange}
//             onValueChange={(value) => setPriceRange([value[0], value[1]])}
//             max={1000}
//             step={10}
//             className="w-full"
//           />
//           <div className="flex justify-between text-sm text-gray-600">
//             <span>${priceRange[0]}</span>
//             <span>${priceRange[1]}</span>
//           </div>
//         </div>
//         <div>
//           <Button
//             className="w-full"
//             onClick={() => filterProducts({ priceRange: priceRange })}
//           >
//             Filter Price
//           </Button>
//         </div>
//       </div>

//       <Collapsible defaultOpen>
//         <CollapsibleTrigger className="flex items-center justify-between w-full">
//           <h3 className="font-semibold">Categories</h3>
//           <ChevronDown className="h-4 w-4" />
//         </CollapsibleTrigger>
//         <CollapsibleContent className="space-y-3 mt-4">
//           {CATEGORIES.map((category) => (
//             <div key={category} className="flex items-center space-x-2">
//               <Checkbox
//                 id={category}
//                 onCheckedChange={(value) => {
//                   if (value) {
//                     filterProducts({ category: category });
//                   } else {
//                     filterProducts({ category: "" });
//                   }
//                 }}
//               />
//               <Label htmlFor={category} className="text-sm">
//                 {category}
//               </Label>
//             </div>
//           ))}
//         </CollapsibleContent>
//       </Collapsible>

//       <Collapsible defaultOpen>
//         <CollapsibleTrigger className="flex items-center justify-between w-full">
//           <h3 className="font-semibold">Rating</h3>
//           <ChevronDown className="h-4 w-4" />
//         </CollapsibleTrigger>
//         <CollapsibleContent className="space-y-3 mt-4">
//           {[4, 3, 2, 1].map((rating) => (
//             <div key={rating} className="flex items-center space-x-2">
//               <Checkbox
//                 id={`rating-${rating}`}
//                 onCheckedChange={(value) => {
//                   if (value) {
//                     filterProducts({ rating: rating });
//                   } else {
//                     filterProducts({ rating: 0 });
//                   }
//                 }}
//               />
//               <Label
//                 htmlFor={`rating-${rating}`}
//                 className="flex items-center text-sm"
//               >
//                 <div className="flex mr-2">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-3 w-3 ${
//                         i < rating
//                           ? "fill-yellow-400 text-yellow-400"
//                           : "text-gray-300"
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 & Up
//               </Label>
//             </div>
//           ))}
//         </CollapsibleContent>
//       </Collapsible>
//       <div>
//         {(filters.category ||
//           filters.priceRange ||
//           filters.rating ||
//           filters.sortBy) && (
//           <Button onClick={clearFilters} className="w-full">
//             Clear Filters
//           </Button>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Filter, X } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useProducts } from "@/hooks/use-products";
import {
  type ProductFilterFormData,
  productFilterSchema,
} from "@/lib/validations/product";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export function FilterSidebar() {
  const { categories, clearFilters, filters, filterProducts } = useProducts();

  const searchParams = useSearchParams();

  const form = useForm<ProductFilterFormData>({
    resolver: zodResolver(productFilterSchema),
    defaultValues: {
      category: filters.category ? [filters.category] : [],
      priceRange: filters.priceRange || [0, 1000],
      rating: filters.rating || undefined,
    },
  });

  const formValues = form.watch();

  // Update form when filters change from outside
  useEffect(() => {
    form.reset({
      category: filters.category ? [filters.category] : [],
      priceRange: filters.priceRange || [0, 1000],
      rating: filters.rating || undefined,
    });
  }, [filters, form]);

  const onSubmit = (value: ProductFilterFormData) => {
    const category =
      value.category?.length === 1 ? value.category[0] : undefined;

    filterProducts({
      category,
      priceRange: value.priceRange as [number, number],
      rating: value.rating,
    });
  };

  const handleClear = () => {
    form.reset({
      category: [],
      priceRange: [0, 1000],
      rating: undefined,
    });

    clearFilters();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          {(filters.category || filters.priceRange || filters.rating) && (
            <Button className="h-8 px-2 text-sm" onClick={handleClear}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          <div className="space-y-4">
            <Controller
              control={form.control}
              name="priceRange"
              render={({ field }) => (
                <Slider
                  value={field.value}
                  onValueChange={field.onChange}
                  max={1000}
                  step={10}
                  className="w-full"
                />
              )}
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>${formValues.priceRange?.[0] || 0}</span>
              <span>${formValues.priceRange?.[1] || 1000}</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="font-semibold">Categories</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-4">
            {categories.map((category) => (
              <FormField
                key={category}
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id={`category-${category}`}
                        checked={field.value?.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            field.onChange([category]);
                          } else {
                            field.onChange(
                              field.value?.filter(
                                (value) => value !== category
                              ) || []
                            );
                          }
                        }}
                      />
                    </FormControl>
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </FormItem>
                )}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Rating */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 className="font-semibold">Rating</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 mt-4">
            {[4, 3, 2, 1].map((rating) => (
              <FormField
                key={rating}
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={field.value === rating}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? rating : undefined);
                        }}
                      />
                    </FormControl>
                    <Label
                      htmlFor={`rating-${rating}`}
                      className="flex items-center text-sm"
                    >
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-3 w-3 ${
                              i < rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      & Up
                    </Label>
                  </FormItem>
                )}
              />
            ))}
          </CollapsibleContent>
        </Collapsible>
        <div>
          <Button type="submit" className="w-full">
            <Filter className="h-4 w-4 mr-2" />
            Apply filters
          </Button>
        </div>
      </form>
    </Form>
  );
}
