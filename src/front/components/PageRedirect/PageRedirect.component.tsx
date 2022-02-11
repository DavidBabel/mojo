import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

import { LoadingOrError } from "@/LoadingOrError";

interface Props {
  to: string;
}

export function PageRedirect({ to }: Props) {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push(to);
  }, [router, to]);
  return <LoadingOrError />;
}

/**
 * Helper for nextjs redirects.
 */
export function Redirect({ to }: Props) {
  const dynamicComponent = () => <PageRedirect to={to} />;
  return dynamicComponent;
}
