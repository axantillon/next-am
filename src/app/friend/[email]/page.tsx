import UserBox from "@/components/UserBox";
import UserList from "@/components/UserList";
import { Suspense } from "react";


export default function Page({params} : {params: {email: string}}) {

    return (
        <main className="flex flex-col items-center w-full space-y-12">
            <UserBox userEmail={params.email} />
            <Suspense fallback={<div>Loading...</div>}>
                
            </Suspense>
        </main>
    )
}