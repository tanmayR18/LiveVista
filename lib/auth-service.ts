import { currentUser } from "@clerk/nextjs";

import { db } from "./db";

export const getSelf = async () => {
    const self = await currentUser();

    if( !self || !self.username) {
        throw new Error("Unauthorized")
    }

    const user = await db.user.findUnique({
        where: { externalUserId: self.id}
    })

    if(!user){
        throw new Error(`Could not find User with id ${self.id}`);
    }


    return user;
}