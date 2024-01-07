import { db } from "./db";
import { getSelf } from "./auth-service";


export const isBlockedByUser = async( id: string) => {
    try{

        const self = await getSelf()

        const otherUser = await db.user.findUnique({
            where:{id}
        })

        if(!otherUser){
            throw new Error("User not found")
        }

        if( self.id === otherUser.id){
            return false
        }


        const exisitingBlock = await db.block.findUnique({
            where:{
                blockerId_blockedId:{
                    blockerId: otherUser.id,
                    blockedId: self.id
                }
            }
        })

        return !!exisitingBlock

    } catch{
        return false;  //If error, assume not blocked.
    }
}


export const blockUser = async(id: string) => {

    const self = await getSelf()

    if(self.id === id){
        throw new Error("Cannot block yourself")
    }

    const otherUser = await db.user.findUnique({
        where: {id}
    })

    if(!otherUser){
        throw new Error("User not found")
    }

    const exisitingBlock = await db.block.findUnique({
        where:{
            blockerId_blockedId:{
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    })

    if(exisitingBlock){
        throw new Error("Already Blocked")
    }

    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id
        },
        include: {
            blocked: true
        }
    })

    return block;
}

export const unBlockUser = async(id: string) => {

    const self = await getSelf()

    if(self.id === id){
        throw new Error("Cannot Unblock yourself")
    }

    console.log("ID => ",id)
    const otherUser = await db.user.findUnique({
        where: {id}
    })

    console.log("Other user =>", otherUser)

    if(!otherUser){
        throw new Error("User not found")
    }

    const exisitingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    })

    if(!exisitingBlock) {
            throw new Error("Not blocked")
        }

    const unblock = await db.block.delete({
        where: {
            id: exisitingBlock.id
        },
        include:{
            blocked: true
        }
    })

    return unblock
}

export const getBlockedUsers = async () => {
    const self = await getSelf()

    const blockedUsers = await db.block.findMany({
        where: {
            blockerId: self.id
        },
        include: {
            blocked: true
        }
    })

    return blockedUsers
}

