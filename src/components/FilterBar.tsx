import StarIcon from "@mui/icons-material/Star";
import { debounce } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useEffect, useMemo, useState } from "react";

type FilterBarProps = {
    onChange: (f: ProductFilters) => void;
};

export default function FilterBar({ onChange }: FilterBarProps) {
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [minRating, setMinRating] = useState<number>(0);

    const delayedOnChange = useMemo(
        () => debounce(onChange, 500),
        [onChange]         // recreate only if the *prop* itself changes
    );

    useEffect(() => {
        delayedOnChange({ minPrice, maxPrice, minRating });
    }, [minPrice, maxPrice, minRating, delayedOnChange]);

    return (
        <div className="flex flex-wrap justify-center items-center gap-4 w-4/5 mx-auto mb-6">
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Price:</span>

                <input
                    type="number"
                    min={ 0 }
                    placeholder="Min"
                    className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                    value={ minPrice ?? '' }
                    onChange={ (e) => setMinPrice(e.target.value ? +e.target.value : null) }
                />

                <span className="mx-1 text-sm">—</span>

                <input
                    type="number"
                    min={ 0 }
                    placeholder="Max"
                    className="w-24 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-gray-300"
                    value={ maxPrice ?? '' }
                    onChange={ (e) => setMaxPrice(e.target.value ? +e.target.value : null) }
                />
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rating:</span>
                <Rating
                    value={ minRating }
                    precision={ 0.5 }
                    onChange={ (_, v) => setMinRating(v ?? 0) }
                    size="small"
                    icon={ <StarIcon fontSize="inherit" htmlColor="#F6D5A8" /> }
                    emptyIcon={ <StarIcon fontSize="inherit" htmlColor="#D9D9D9" /> }
                    sx={ { fontSize: 16 } }
                />

            </div>
        </div>
    );
}