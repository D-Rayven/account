import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const memberHelper = {
    getById,
    getMembers,
    createMember,
}

async function getById(id: number) {
    return prisma.member.findUnique({
        where: {
            id: id,
        }
    });
}

async function getMembers() {
    return prisma.member.findMany();
}

async function createMember(email: string, firstName: string, lastName: string, password: string) {
    try {
        const member = prisma.member.create({
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
            }
        });
        return member;
    } catch(e: any) {
        return console.error(e.message);
    }
}