import getUser from '@/server/helpers/getUser';
import { getServerSession } from 'next-auth';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card } from '../ui/card';
import AskInput from './AskInput';
import EditButton from './EditButton';

interface indexProps {
  userEmail?: string;
}

const UserBox: FC<indexProps> = async ({ userEmail }) => {

    const session = await getServerSession();

    if (!session && !userEmail) return (
        <Card className='w-2/3 h-60 flex items-center justify-center'>
            <span className='font-semibold'>You are not logged in!</span>
        </Card>
    )

    const user = userEmail ? await getUser(userEmail) : await getUser(session?.user?.email!!);

    if (!user) return (
        <Card className='w-2/3 h-60 items-center justify-center'>
            <span className='font-semibold'>This user does not seem to exist!</span>
        </Card>
    )

    return (
        <Card className='w-2/3 h-60 p-8 flex flex-row space-x-8'>
            <div className="">
                <Avatar className='w-20 h-20'>
                    <AvatarImage src={user.image!!} alt={user.name!!} />
                    <AvatarFallback>{(user.name || "").match(/[A-Z]/g)?.join('')}</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex flex-col w-full space-y-6">
                <div className="flex flex-row items-center justify-between">
                    <span>Hey this is <b>{user.name}!</b></span>
                    {session?.user?.email === user.email &&
                        <EditButton user={user} />
                    }
                </div>
                <AskInput user={user} />
            </div>
        </Card>
    )
}

export default UserBox;