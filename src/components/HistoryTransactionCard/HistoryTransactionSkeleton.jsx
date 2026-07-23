import React from "react";

export default function HistoryTransactionSkeleton({ count = 5 }) {
    return (
        <div className="flex flex-col gap-3 min-h-[440px] animate-pulse">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-300/30"
                >
                    <div className="flex items-center gap-4">
                        {/* Circle for icon */}
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />

                        {/* Title & Subtitle */}
                        <div className="flex flex-col gap-2">
                            <div className="h-4 bg-gray-200 rounded w-36" />
                            <div className="h-3 bg-gray-200 rounded w-28" />
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="h-5 bg-gray-200 rounded w-20 flex-shrink-0" />
                </div>
            ))}
        </div>
    );
}
