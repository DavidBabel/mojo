import { useRouter } from "next/router";

export function useUserIdRouter() {
  const router = useRouter();
  const { query } = router;
  const userId = String(query.userId);

  return { router, userId };
}
