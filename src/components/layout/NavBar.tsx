import { handler } from '@/server/prisma';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FC } from 'react';
import UserProfile from '../misc/UserProfile';
import { Button } from '../ui/button';

interface NavBarProps {
  className: string;
}

const NavBar: FC<NavBarProps> = async ({ className }) => {

    const session = await getServerSession();
    const user = await handler().getUser(session?.user?.email!!)

    return (
        <div className={`flex items-center justify-between w-full ${className}`}>
            <Link href="/">
                <span className="text-base sm:text-2xl font-bold">Answering Machine</span>
            </Link>

            {user && user ? 
                <UserProfile user={user} className="w-36 h-12 sm:w-48 sm:h-14 rounded-lg" />
                
            :
               <Link href="/api/auth/signin">
                    <Button variant={'outline'} className="w-36 h-12 sm:w-48 sm:h-14 flex items-center justify-center rounded-lg">
                        <span>Sign In</span>
                    </Button>
                </Link>
            }
        </div>
    )
}

export default NavBar;