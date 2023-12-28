"use client"

import { useSidebar } from "@/store/use-sidebar";
import { User, follow } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

interface FollowingProps {
    data: ( follow & { following: User})[];
}

const Following = ({
    data
} : FollowingProps) => {

    const { collapsed } = useSidebar( state => state)

    if(!data.length) {
        return null
    }

    return (
        <div>
            {
                !collapsed && (
                    <div className=" pl-6 mb-4">
                        <p className=" text-sm text-muted-foreground">
                            Following
                        </p>
                    </div>
                )
            }
            <ul className=" space-y-2 px-2">
                {
                    data.map( follow => (
                        <UserItem 
                            key={follow.following.id}
                            username={follow.following.username}
                            imageUrl={follow.following.imageUrl}
                            // isLive={true}
                        />
                    ))
                }
            </ul>
        </div>
    );
}
 
export default Following;


export const FollowingSkeleton = () => {
    return (
        <ul className=" px-2 lg:pt-0">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}