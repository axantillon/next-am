import { PrismaClient } from "@prisma/client";
import { User } from "next-auth";
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

const prisma = new PrismaClient();

export const handler = () => {

  const createQuestion = async (data: { question: string, answer: string, score: string, userEmail: string, authorEmail: string }) => {
    try {
      const question = await prisma.question.create({
        data
      });
      return question;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const updateUser = async (email: string, data: any) => {
    try {
      const user = await prisma.user.update({
        where: {
          email: email
        },
        data
      });
      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  const upsertUser = async (user: User) => {
    return await prisma.user.upsert({
      where: {
        email: user.email ? user.email : "",
      },
      update: {
        ...user,
        email: user.email ? user.email : "",
      },
      create: {
        ...user,
        email: user.email ? user.email : "",
      },
    });
  }

  const getQuestions = async (email: string) => {
    const questions = await prisma.question.findMany({
      where: {
        userEmail: email,
      },
    });
    return questions;
  }

  const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
  }

  const getUser = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email: decodeURIComponent(email),
      },
    });
    return user;
  }

  return {
    createQuestion,
    updateUser,
    upsertUser,
    getQuestions,
    getAllUsers,
    getUser
  }
}