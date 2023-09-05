import { handler } from "@/server/prisma";
import { DateTime } from "luxon";
import Link from 'next/link';
import { FC, cache } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

interface QuestionListProps {
  userEmail: string;
}

const revalidate = 30; 

const getQuestions = cache(async(userEmail: string) => {
    const questions = await handler().getQuestions(userEmail)
    return questions
})

const QuestionList: FC<QuestionListProps> = async ({ userEmail }) => {

    const questions = await getQuestions(decodeURIComponent(userEmail))

    return (
        <div className="w-full flex flex-col items-center space-y-4">
            {questions.map((q, i) => (
                <Card key={i} className='flex flex-col w-full sm:w-1/2 max-w-[450px] h-52 sm:h-48'>
                    <CardHeader>
                        <CardTitle>
                            {q.question}
                        </CardTitle>
                        <CardDescription>
                            Asked by <Link className='underline' href={`/friend/${q.authorEmail}`}>{q.authorEmail}</Link> on {DateTime.fromJSDate(q.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='items-center justify-center flex-1 pb-0'>
                        <span className='text-lg font-bold line-clamp-3'>{q.answer}</span>
                    </CardContent>
                    <CardFooter className='justify-end'>
                        <span className="text-xs text-gray-500">Confidence Score: {q.score.toString()}</span>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default QuestionList;