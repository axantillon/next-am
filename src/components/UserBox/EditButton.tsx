import { FC } from 'react';
import EditDialog from '../misc/EditDialog';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { User } from '@prisma/client';

interface EditButtonProps {
  user: User;
}

const EditButton: FC<EditButtonProps> = ({ user }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <span className='text-xs sm:text-sm'>Edit Profile</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <EditDialog user={user}/>
            </DialogContent>
        </Dialog>
    )
}

export default EditButton;