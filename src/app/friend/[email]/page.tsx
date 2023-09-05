import QuestionList from "@/components/QuestionList";
import UserBox from "@/components/UserBox";
import Link from "next/link";
import { Suspense } from "react";


export default function Page({params} : {params: {email: string}}) {

    return (
        <main>
            <Link href="/">
                <span>{"<-- Go Back"}</span>
            </Link>
            <div className="flex flex-col items-center w-full space-y-12 pb-8">
                <UserBox userEmail={params.email} />
                <Suspense fallback={<div>Loading...</div>}>
                    <QuestionList userEmail={params.email} />
                </Suspense>
            </div>
        </main>
    )
}