"use client";

import FilterBar from "@/components/FilterBar";
import ProductCard from "@/components/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCallback, useEffect, useState } from "react";


export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<ProductFilters>({
        minPrice: null,
        maxPrice: null,
        minRating: null,
    });

    const handleResponse = useCallback(async (res: Response) => {
        if (!res.ok) {
            const err = await res.json();
            throw new Error("Failed to fetch products: " + err.detail);
        }

        const data: { products: Product[] } = await res.json();
        setProducts(data.products);
    }, []);

    useEffect(() => {
        console.log(filters);
        const queryParams = new URLSearchParams();
        if (filters.minPrice !== null) {
            queryParams.append("min-price", filters.minPrice.toString());
        }
        if (filters.maxPrice !== null) {
            queryParams.append("max-price", filters.maxPrice.toString());
        }
        if (filters.minRating !== null) {
            queryParams.append("min-score", filters.minRating.toString());
        }

        fetch(`/api/products?${ queryParams }`).then(handleResponse)
    }, [handleResponse, filters]);


    return (
        <main className="pt-10 w-full space-y-3">
            <h1 className="font-avenir text-[45px] text-center">
                Product List
            </h1>

            <FilterBar onChange={ setFilters } />

            <Carousel
                className="w-4/5 mx-auto p-4"
                opts={ {
                    align: "start"
                } }
            >
                <CarouselContent className="">
                    { products.map((product) => (
                        <CarouselItem key={ product._id } className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                            <ProductCard
                                name={ product.name }
                                price={ product.price }
                                popularityScore={ product.popularityScore }
                                images={ product.images }
                            />
                        </CarouselItem>
                    )) }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </main>
    );
}
