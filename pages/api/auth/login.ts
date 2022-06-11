import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuth } from "utils/firebaseAdmin/app";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { idToken } = req.body as any;
  if (!idToken) {
    res.status(401);
    throw new Error("no valid idToken");
  }
  const decoded = await firebaseAuth.verifyIdToken(idToken);

  res.setHeader("Set-Cookie", `uid=${decoded.uid}; path=/;`);
  res.status(200).json({ success: true });
};
