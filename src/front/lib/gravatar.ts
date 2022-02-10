import md5 from "md5";

export function getGravatarLink(email: string) {
  if (!email) return "";
  return `https://www.gravatar.com/avatar/${md5(
    email.trim().toLowerCase(),
  )}?d=identicon`;
}
