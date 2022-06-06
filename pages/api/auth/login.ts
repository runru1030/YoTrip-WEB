import { NextApiRequest, NextApiResponse } from "next";
import { firebaseAuth } from "utils/firebaseAdmin/app";
import { withIronSessionApiRoute } from "iron-session/next";
import { ironOptions } from "lib/ironSessionConfig";

export default withIronSessionApiRoute(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const { idToken } = req.body as any;
    if (!idToken) {
      res.status(401);
      throw new Error("no valid idToken");
    }
    const decoded = await firebaseAuth.verifyIdToken(idToken);
    (req.session as any).token = decoded.uid;
    await req.session.save();
    res.json({ sucess: true });
  },
  ironOptions
);
