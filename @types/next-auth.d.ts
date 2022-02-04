import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

import { AuthProviders, UserRole } from "~/iso/enums";

declare module "next-auth" {
  interface Session {
    provider: AuthProviders;
    user: {
      email?: string | null;
      id: string;
      image?: string | null;
      name: string;
      role: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string;
    providerId?: string;
  }
}

export type SessionHandler = ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}) => Promise<Session>;
