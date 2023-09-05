'use client'
import { User } from '@prisma/client';
import { FC, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useHF } from '@/lib/utils/hooks/useHF';

interface AskInputProps {
  user: User;
}

const AskInput: FC<AskInputProps> = ({ user }) => {

    const { answer, loading, askQuestion } = useHF(user.bio!!, user.email!!);
    const [question, setQuestion] = useState('');


    return (
        <div className={'w-full h-full'}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-x-8">
                <Input disabled={!user.bio} placeholder='Ask me anything!' value={question} onChange={(e) => setQuestion(e.target.value)} />
                <Button onClick={() => askQuestion(question)} className='w-20 h-10'>Ask</Button> 
            </div>
            <div className="flex flex-col space-y-2">
                {!user.bio && <span className='text-sm text-red-500'>User has not uploaded a biography!</span>}
                {loading ? 
                    <span>Loading...</span> 
                :
                    answer && <span>{answer}</span>
                }
            </div>
        </div>
    )
}

export default AskInput;