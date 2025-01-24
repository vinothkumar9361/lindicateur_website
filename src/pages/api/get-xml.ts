import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await axios.get("https://www.industrie-mag.com/backend.xml");
        res.setHeader("Content-Type", "application/xml");
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch XML" });
    }
}
