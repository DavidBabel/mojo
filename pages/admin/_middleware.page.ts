// https://next-auth.js.org/configuration/nextjs#default-withauth-export

import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: () => true,
  },
});
