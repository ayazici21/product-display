import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
    return (
        <div className="w-full p-4 grid grid-rows-2 font-avenir px-6 space-y-3">
            <div className="select-none mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-gray-50 relative">
                <Skeleton className="w-full h-full" />
            </div>
            <div className="space-y-1 flex flex-col">
                <Skeleton className="w-4/5 h-[15px] mt-1 mb-2" />
                <Skeleton className="w-1/5 h-[15px] mt-1 mb-2" />
                <div className="my-3 flex items-center gap-x-2">
                    <button className="flex items-center justify-center size-[24px] rounded-full border-none">
                        <div className={ `size-[16px] rounded-full bg-[#E6CA97]` } />
                    </button>
                    <button className="flex items-center justify-center size-[24px] rounded-full border-none">
                        <div className={ `size-[16px] rounded-full bg-[#D9D9D9]` } />
                    </button>
                    <button className="flex items-center justify-center size-[24px] rounded-full border-none">
                        <div className={ `size-[16px] rounded-full bg-[#E1A4A9]` } />
                    </button>
                </div>

                <Skeleton className="h-[12px] w-1/4 mt-1 mb-2" />
                <div className="flex items-center gap-x-2">
                    <Skeleton className="h-[14px] w-1/2 my-1" />
                    <Skeleton className="h-[14px] w-1/4 my-1" />
                </div>
            </div>
        </div>
    )
}