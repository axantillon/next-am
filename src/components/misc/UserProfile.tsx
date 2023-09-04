"use client"

import { User } from '@prisma/client';
import { Dialog, DialogContent, DialogTrigger } from '@radix-ui/react-dialog';
import { signOut } from 'next-auth/react';
import { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import EditDialog from './EditDialog';

interface UserProfileProps {
  user: User;
  className: string;
}

const UserProfile: FC<UserProfileProps> = ({ user, className }) => {

    if (!user) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'} className={`${className} flex items-center justify-start px-2`}>
                    <Avatar>
                        <AvatarImage src={user.image!!} alt={user.name!!} />
                        <AvatarFallback>{(user.name || "").match(/[A-Z]/g)?.join('')}</AvatarFallback>
                    </Avatar>
                    <span className="ml-2 truncate">{user.name || user.email}</span>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className='w-48'>
                <DropdownMenuItem onClick={() => signOut()}>
                    <span> Sign Out </span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfile;