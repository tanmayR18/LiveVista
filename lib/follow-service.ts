import { db } from "./db";

import { getSelf } from "./auth-service";


export const getFollowedUsers = async() => {
    try{
        const self = await getSelf();

        const followedUsers = await db.follow.findMany({
            where: {
                follwerId: self.id,
                following:{
                    blocking:{
                        none:{
                            blockedId: self.id
                        }
                    }
                }
            },
            include: {
                following: true
            }
        })

        return followedUsers
    } catch{
        return []
    }
}

export const isFollowingUser = async (id: string) => {
    try{
        const self = await getSelf()
        const otherUser = await db.user.findUnique({
            where: { id },
        })

        if(!otherUser){
            throw new Error("User not found")
        }

        if(otherUser.id === self.id){
            return true
        }

        const exisitingFollow = await db.follow.findFirst({
            where: {
                follwerId: self.id,
                followingId: otherUser.id,
            }
        })

        return !!exisitingFollow

    } catch {
        return false
    }
}


export const followUser = async (id: string) => {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: {id}
    })

    if(!otherUser){
        throw new Error(`User not found`)
    }

    if(otherUser.id === self.id){
        throw new Error('You can\'t follow yourself')
    }

    const exisitingFollow = await db.follow.findFirst({
        where: {
            follwerId: self.id,
            followingId: otherUser.id,
        }
    })

    if (exisitingFollow) {
        throw new Error("Already Following")
    }

    const follow = await db.follow.create({
        data: {
            follwerId: self.id,
            followingId: otherUser.id
        },
        include: {
            following: true,
            follower: true,
        }
    })

    return follow
}


export const unfollowUser = async(id: string) => {
    const self = await getSelf()
    const otherUser = await db.user.findUnique({
        where: {
            id
        }
    });

    if(!otherUser) {
        throw new Error("User not found")
    }

    if(otherUser.id === self.id){
        throw new Error("Cannot unfollow yourself")
    }

    const exisitingFollow = await db.follow.findFirst({
        where: {
            follwerId: self.id,
            followingId: otherUser.id
        }
    })

    if(!exisitingFollow) {
        throw new Error("Not Following")
    }

    const follow = await db.follow.delete({
        where: {
            id: exisitingFollow.id,
        },
        include: {
            following: true
        }
    })

    return follow
}