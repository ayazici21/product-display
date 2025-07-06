interface Product {
    _id: string;
    name: string;
    popularityScore: number;
    images: {
        yellow: string;
        rose: string;
        white: string;
    }
    price: number;
}

interface ProductFilters {
    minPrice: number | null;
    maxPrice: number | null;
    minRating: number | null;
}