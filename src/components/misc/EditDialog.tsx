'use client'
import { User } from '@prisma/client';
import { FC, useState } from 'react';
import { Button } from '../ui/button';
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface EditDialogProps {
  user: User;
}

const EditDialog: FC<EditDialogProps> = ({user}) => {

    const [userBio, setUserBio] = useState(user.bio || '');
    const [userName, setUserName] = useState(user.name || '');
    const [saving, setSaving] = useState(false);

    const handleSubmit = async () => {
        try {
            setSaving(true);
            const res = await fetch(`/api/user/${user.email}`, {
                method: 'POST',
                body: JSON.stringify({
                    name: userName,
                    bio: userBio
                })
            })
            const data = await res.json();
            setSaving(false);
            console.log(data);
        } catch (e) {
            setSaving(false);
            console.error(e);
        }
    }

    return (<>
        <DialogHeader>
            <DialogTitle> Edit Profile </DialogTitle>
            <DialogDescription>
                {"Make changes to your biograpy here. This will be used to answer questions about you. Click save when you're done."}
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="bio" className="text-right mt-2">
              Bio
            </Label>
            <Textarea id="bio" value={userBio} onChange={(e) => setUserBio(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => handleSubmit()} disabled={saving} type="submit">{saving ? 'Saving...' : 'Save changes'}</Button>
        </DialogFooter>
    </>)
}

export default EditDialog;