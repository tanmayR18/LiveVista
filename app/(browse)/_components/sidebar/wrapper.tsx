"use client"
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";
import { useEffect } from "react";
import { FollowingSkeleton } from "./following";

interface WrapperProps {
    children: React.ReactNode
};


const Wrapper = ({children}: WrapperProps) => {

    const { collapsed} = useSidebar( state => state)
    const isClient = useIsClient();

    if(!isClient) {
        return (
            <aside className=" fixed  left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50">
                <ToggleSkeleton/>
                <FollowingSkeleton />
                <RecommendedSkeleton/>
            </aside>
        )
    }

    return (
        <div>
            <aside
                className={cn(
                    " fixed  left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50",
                    collapsed && "w-[70px]"
                )}
            >
                {children}
            </aside>
        </div>
    );
}
 
export default Wrapper;