export {};
// import { PrismaClient } from "@prisma/client";
// import { NextApiRequest, NextApiResponse } from "~/@types/next";
// import { hashPassword } from "~/server/services/hash-password.service";

// interface Body {
//   email: string;
//   password: string;
//   name: string;
// }

/////

// se register resolver

////
// async function handler(req: NextApiRequest<Body>, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return;
//   }

//   const { email, password, name } = req.body;

//   if (
//     !name ||
//     !email ||
//     !email.includes("@") ||
//     !password ||
//     password.trim().length < 7
//   ) {
//     res.status(422).json({
//       message:
//         "Invalid input - password should also be at least 7 characters long.",
//     });
//     return;
//   }

//   const prisma = new PrismaClient();

//   const existingUser = await prisma.user.findFirst({ where: { email } });

//   if (existingUser) {
//     res.status(422).json({ message: "User exists already!" });
//     return;
//   }

//   const hashedPassword = hashPassword(password);

//   const result = await prisma.user.create({
//     data: {
//       email,
//       name,
//       password: hashedPassword,
//       role: "USER",
//     },
//   });

//   res.status(201).json({ message: "Created user!" });
//   await prisma.$disconnect();
// }

// export default handler;
