import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { memberHelper } from "../../helper/member";

const prisma = new PrismaClient();

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case "GET":
            return getMembers();
        case "POST":
            return createMember();
        default:
            return res.status(405).end('Method ${req.method} Not Allowed');
    }

    async function getMembers() {
        const members = await memberHelper.getMembers();
        return res.json(members);
    }

    async function createMember() {
        const member = await memberHelper.createMember(req.body.email, req.body.firstName, req.body.lastName, req.body.password);
        return res.json(member);
    }
}

export default handler;