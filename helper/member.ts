import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const memberHelper = {
    getById,
    getByEmail,
    getMembers,
    createMember,
    deleteMember,
}

async function getById(id: number) {
    return prisma.member.findUnique({
        where: {
            id: id,
        }
    });
}

async function getByEmail(email: string) {
    return prisma.member.findUnique({
        where: {
            email: email,
        }
    });
}

async function getMembers() {
    return prisma.member.findMany();
}

async function createMember(email: string, firstName: string, lastName: string, password: string) {
    try {
        return prisma.member.create({
            data: {
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
            }
        });
    } catch(e: any) {
        return console.error(e.message);
    }
}

async function deleteMember(id: number) {
    try {
        return prisma.member.delete({
            where: {
                id: id,
            },
        });
    } catch(e: any) {
        return console.error(e.message);
    }
}