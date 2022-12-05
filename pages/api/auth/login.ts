import { NextApiRequest, NextApiResponse } from 'next';
import { memberHelper } from '../../../helper/member';

async function login(req: NextApiRequest, res: NextApiResponse) {
    const member = await memberHelper.getByEmail(req.body.email);

    if (member != null) {
        if (member["password"]  != req.body.password) {
            return res.status(404).json("Mot de passe erroné !");
        }
        return res.json(member);
    }

    return res.status(404).json("L'utilisateur n'existe pas ! Vérifiez l'email saisi.");
}

export default login;