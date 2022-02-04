import GithubProvider from "next-auth/providers/github";

import { CONFIG } from "~/iso/config";
import { AuthProviders } from "~/iso/enums";

export const githubProvider = GithubProvider({
  clientId: CONFIG.GITHUB_ID,
  clientSecret: CONFIG.GITHUB_SECRET,
  id: AuthProviders.Github,
});
