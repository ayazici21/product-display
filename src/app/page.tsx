"use client";

import FilterBar from "@/components/FilterBar";
import ProductCarousel from "@/components/ProductCarousel";
import { useCallback, useEffect, useState } from "react";


export default function Home() {
    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState<Product[]>([]);
    const [filters, setFilters] = useState<ProductFilters>({
        minPrice: null,
        maxPrice: null,
        minRating: 0,
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
        if (loading) {
            console.log("Loading");
        } else {
            console.log("Not loading")
        }
    }, [loading]);

    useEffect(() => {
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

        fetch(`/api/products?${ queryParams }`).then(handleResponse).then(() => setLoading(false));
    }, [handleResponse, filters]);

    return (
        <main className="pt-10 w-full space-y-3">
            <h1 className="font-avenir text-[45px] text-center">
                Product List
            </h1>

            <FilterBar onChange={ setFilters } />

            <ProductCarousel products={ products } loading={ loading } />
        </main>
    );
}
