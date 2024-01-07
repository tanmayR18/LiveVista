import { db } from "./db"


export const getUserByUsername = async(username: string) => {
    const user = await db.user.findUnique({
        where:{
            username,
        },
        select: {
            id: true,
            externalUserId: true,
            username: true,
            bio: true,
            imageUrl:true,
            stream: {
                select: {
                    isLive: true,
                    id: true,
                    name: true,
                    isChatDelayed: true,
                    isChatEnabled: true,
                    isChatFollowersOnly: true,
                    thumbnailUrl: true,
                }
            },
            _count: {
                select:{
                    followedBy: true
                }
            }
        }
    })

    return user
}

export const getUserById = async ( id: string) => {
    const user = await db.user.findUnique({
        where: {id},
        include: {
            stream: true
        }
    })

    return user
}