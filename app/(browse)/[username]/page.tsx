import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";
import { isBlockedByUser } from "@/lib/block-service";

interface UserPageProps {
    params: {
        username: string
    }
}

const UserPage = async({
    params
}: UserPageProps) => {

    const user = await getUserByUsername(params.username)

    if(!user){
        notFound()
    }

    const isFollowing = await isFollowingUser(user.id)
    const isBlocked = await isBlockedByUser(user.id)

    

    return (
        <div>
            <p>UserName: {user.username}</p>
            <p>UserId: {user.id}</p>
            <p>is Following: {`${isFollowing}`}</p>
            <p>is Blocked by this user {`${isBlocked}`}</p>

            <Actions userId={user.id} isFollowing = {isFollowing}/>

        </div>
    );
}
 
export default UserPage;