"use client";

import StarIcon from '@mui/icons-material/Star';
import Rating from '@mui/material/Rating';
import Image from "next/image";
import { useState } from "react";

const variants = {
    yellow: {
        color: "#E6CA97",
        label: "Yellow Gold",
    },
    white: {
        color: "#D9D9D9",
        label: "White Gold",
    },
    rose: {
        color: "#E1A4A9",
        label: "Rose Gold",
    }
}

type ProductCardProps = Omit<Product, "_id">

export default function ProductCard({
                                        name,
                                        price,
                                        popularityScore,
                                        images
                                    }: ProductCardProps) {
    const [variant, setVariant] = useState<"yellow" | "white" | "rose">("yellow");

    return (
        <div className="w-full p-4 grid grid-rows-2 font-avenir px-6 space-y-3">
            <div className="select-none mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-gray-50 relative">
                <Image
                    src={ images[variant] }
                    alt={ `${ name } in ${ variants[variant].label }` }
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="space-y-1 flex flex-col">
                <h2 className="font-montserrat-md text-[15px]"> { name }</h2>
                <p className="font-montserrat text-[15px]">${ price.toFixed(2) } USD</p>
                <div className="my-3 flex items-center gap-x-2">
                    { Object.entries(variants).map(([key, { color }]) => (
                        <button
                            key={ key }
                            className={
                                "flex items-center justify-center size-[24px] rounded-full border-1 transition " +
                                (variant === key ? "border-gray-800" : "hover:border-gray-500 border-transparent")
                            }
                            onClick={ () => setVariant(key as "yellow" | "white" | "rose") }
                        >
                            <div className={ `size-[16px] rounded-full bg-[${ color }]` } />
                        </button>
                    )) }
                </div>
                <p className="font-avenir text-[12px]">
                    { variants[variant].label }
                </p>
                <div className="flex items-center gap-x-2">
                    <Rating
                        value={ popularityScore }
                        precision={ 0.1 }
                        readOnly
                        size="small"
                        sx={ {
                            fontSize: "18px"
                        } }
                        icon={ <StarIcon fontSize="inherit" htmlColor="#F6D5A8" /> }
                        emptyIcon={ <StarIcon fontSize="inherit" htmlColor="#D9D9D9" /> }
                    />
                    <span className="font-avenir text-[14px]">
                        { popularityScore.toFixed(1) }/5
                    </span>
                </div>
            </div>
        </div>
    )
}