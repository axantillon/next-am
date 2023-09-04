import { prisma } from '@/server/prisma';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card } from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';

interface UserListProps {
  
}

const UserList: FC<UserListProps> = async ({  }) => {

    const users = await prisma.user.findMany();

    return (
        <div className={'flex flex-wrap'}>
            {users.map((user, i) => (
                <Card key={i} className="flex flex-col items-center justify-evenly w-48 h-56 p-6 mr-8 mt-8">
                    <Avatar className='w-12 h-12'>
                        <AvatarImage src={user.image!!} alt={user.name!!} />
                        <AvatarFallback>{(user.name || "").match(/[A-Z]/g)?.join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center items-center">
                        <h3 className='text-lg font-bold'>{user.name}</h3>
                        <p className='text-xs text-gray-500'>{user.email}</p>
                    </div>
                    <Link href={`/friend/${user.email}`}>
                        <Button variant={'outline'} className='mt-2'>Ask me!</Button>
                    </Link>
                </Card>
            ))}
        </div>
    )
}

export default UserList;