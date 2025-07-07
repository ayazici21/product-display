import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function ProductCarousel({ products, loading }: { products: Product[], loading: boolean }) {
    if (loading) {
        return (
            <Carousel
                className="w-4/5 mx-auto p-4"
                opts={ {
                    align: "start",
                    watchDrag: false
                } }
            >
                <CarouselContent>
                    { Array.from({ length: 4 }).map((_, index) => (
                        <CarouselItem
                            key={ index }
                            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                        >
                            <ProductCardSkeleton />
                        </CarouselItem>
                    )) }
                </CarouselContent>
            </Carousel>
        );
    } else if (!products) {
        return (
            <div className="w-full py-10">
                <p className="text-gray-500 text-center text-lg font-avenir">
                    No products found matching your filters.
                </p>
            </div>
        );
    }

    return (
        <Carousel
            className="w-4/5 mx-auto p-4"
            opts={ {
                align: "start",
                watchDrag: true,
            } }
        >
            <CarouselContent>
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
            <CarouselPrevious className="top-1/4" />
            <CarouselNext className="top-1/4" />
        </Carousel>
    )
}