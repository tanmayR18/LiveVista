"use client"

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ChatInfo } from "./chat-info";
import { Info } from "lucide-react";

interface ChatFormProps {
    onSubmit : () => void;
    value: string
    onChange: (vale: string) => void
    isHidden: boolean
    isFollowing: boolean
    isFollowersOnly: boolean
    isDelayed: boolean
}

export const ChatForm = ({
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowing,
    isFollowersOnly,
    isDelayed
}: ChatFormProps) => {

    const [ isDelayedBlocked, setIsDelayBlocked] = useState(false)
    const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing
    const isDisable = isHidden || isDelayedBlocked || isFollowersOnlyAndNotFollowing;

    const handleSubmit = (e:React.FocusEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation()

        if(!value || isDisable) return;

        if(isDelayed && !isDelayedBlocked) {
            setIsDelayBlocked(true)
            setTimeout( () => {
                setIsDelayBlocked(false)
                onSubmit()
            },3000)
        } else {
            onSubmit()
        }
    }

    if (isHidden) {
        return null
    }

  return (
    <form className=" flex flex-col items-center gap-y-4 p-3 "
    onSubmit={handleSubmit}
    >
        <div className=" w-full">
            <div>
                <ChatInfo
                    isDelayed={isDelayed}
                    isFollowersOnly={isFollowersOnly}
                />
            </div>
            <Input 
                onChange={ (e) => onChange(e.target.value)}
                value={value}
                disabled={isDisable}
                placeholder="Send a message"
                className={
                    cn(
                        "border-white/10",
                        isFollowersOnly && "rounded-t-none bottom-t-0"
                    )
                }
            />
        </div>
        <div className=" ml-auto">
            <Button
                type="submit"
                variant={"primary"}
                size={"sm"}
                disabled={isDisable}
            >
                Chat
            </Button>
        </div>
    </form>
  )
}

export default function ChatFormSkeleton() {
  return (
    <div className=" flex flex-col items-center gap-y-4 p-3">
        <Skeleton className=" w-full  h-10" />
        <div className=" flex items-center gap-x-2 ml-auto">
            <Skeleton className=" h-7 w-7" />
            <Skeleton className=" h-7 w-12" />
        </div>
    </div>
  )
}
