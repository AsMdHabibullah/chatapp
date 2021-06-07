import { Router, Request, Response } from "express";

const router = Router();

router.get("/api/next-call", (req: Request, res: Response) => {
  if (req.method === "GET") {
    res.status(200).json({
      id: "as345678cvc",
      status: false,
      phone: "+39 04050543040",
      name: "Abu Sayem Md Habibullah",
      targa: "aa555bb",
    });
  }
});

export default router;
