import { prisma } from "../prisma";

export default async function getUser(email: string) {

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: decodeURIComponent(email)
            }
        });

        return user;
    } catch (e) {
        console.error(e);
        return null;
    }
}