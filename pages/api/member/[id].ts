import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { memberHelper } from "../../../helper/member";

const prisma = new PrismaClient();

export default handler;

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch(req.method) {
        case "GET":
            return getMemberById();
        // case "PUT":
        //     return updateMember();
        // case "DELETE":
        //     return deleteMember();
        default:
            return res.status(405).end('Method ${req.method} Not Allowed');
    }

    async function getMemberById() {
        const member = await memberHelper.getById(Number(req.query.id));
        return res.json(member);
    }

    async function updateMember() {
        
    }
}