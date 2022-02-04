// eslint-disable-next-line no-restricted-imports
import { useSession as useSessionOriginal } from "next-auth/react";

import { UserRole } from "~/iso/enums";

export function useSession() {
  const session = useSessionOriginal();
  const { data, status } = session;

  const isAuthenticated = () => status === "authenticated";
  const isAdmin = () => data?.user.role === UserRole.ADMIN;
  const provider = data?.provider;

  const user = {
    ...data?.user,
  };

  return { isAdmin, isAuthenticated, provider, /* session, */ user };
}
