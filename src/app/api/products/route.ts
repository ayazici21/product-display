import { products } from "@/mongo/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";


const numberSchema = z
    .coerce
    .number()
    .nonnegative().catch(0) // Convert the string to a number, ensure it's >= 0

const schema = z.object({
    low: numberSchema,
    high: numberSchema,
    score: numberSchema.pipe(z.number().max(5).transform(n => n / 5)) // Convert score to a percentage (0-1),
}).transform(({ low, high, score }) => ({
    low: high && low && high < low ? 0 : low, // Remove price filter if high < low
    high: high && low && high < low ? 0 : high,
    score
}));

export async function GET(req: NextRequest) {
    const { searchParams } = req.nextUrl;

    const low = searchParams.get("min-price");
    const high = searchParams.get("max-price");
    const score = searchParams.get("min-score");

    const { data, success, error } = schema.safeParse({ low, high, score });

    if (!success) {
        // We don't expect zod to fail so return a 500 error instead of a 400
        console.error(error)
        return NextResponse.json({ detail: "Internal server error" }, { status: 500 });
    }

    const goldPrice = await getGoldPrice({profile: "standard", type: "ask"})

    const pipeline = [
        {
            $match: {
                popularityScore: { $gte: data.score },
            }
        },
        {
            $set: {
                price: {
                    $multiply: [
                        { $add: [1, "$popularityScore"] },
                        "$weight",
                        goldPrice
                    ],
                },
                popularityScore: {
                    $multiply: ["$popularityScore", 5]
                }
            }
        },
        {
            $match: data.low || data.high ? {
                price: {
                    $gte: data.low,
                    ...(data.high ? { $lte: data.high } : {}),
                },
            } : {}
        },
        {
            $project: {
                weight: 0
            }
        }
    ]

    const res = await products.aggregate(pipeline).toArray();

    return NextResponse.json({ products: res }, { status: 200 });
}

async function getGoldPrice({ profile, type }: { profile: "premium" | "standard" | "prime", type: "bid" | "ask" }) {
    const res = await fetch("https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/XAU/USD", {
        headers: {
            "Accept": "application/json",
        }
    });

    if (!res.ok) {
        throw new Error("Failed to fetch gold price");
    }

    const data: SwissQuoteXAUUSD[] = await res.json();
    const xau = data[0]["spreadProfilePrices"].filter(s => s.spreadProfile === profile)[0][type];

    return xau / 31.1034768; // Convert from troy ounces to grams
}
