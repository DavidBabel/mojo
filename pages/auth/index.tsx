import type { NextPage } from "next";

import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";

const AuthIndexPage: NextPage = () => {
  return (
    <>
      <Title>Auth</Title>
      <ButtonLink href="/auth/login">login</ButtonLink>
      <ButtonLink href="/auth/register">register</ButtonLink>
    </>
  );
};

export default AuthIndexPage;
