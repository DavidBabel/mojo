import { Typography } from "antd";
import type { NextPage, NextPageContext } from "next";
import Image from "next/image";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import React from "react";

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
export const getServerSideProps = async ({ req }: NextPageContext) => {
  const session = await getSession({ req });
  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  console.log(csrfToken);

  return {
    props: { providers, csrfToken },
  };
};

type PageProps = InferSSRProps<typeof getServerSideProps>;

const SignIn: NextPage<PageProps> = ({ providers /* , csrfToken */ }) => {
  return (
    <div>
      <Typography.Title level={2}>Custom Auth Page</Typography.Title>
      <div>
        {/* <div className="email-form">;
          <form method="post" action="/api/auth/signin/email">;
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />;
            <label>;
              Email address;
              <input type="text" id="email" name="email" />;
            </label>;
            <button type="submit">Use your Email</button>;
          </form>;
        </div>; */}
        <p> Note: This page is not designed yet</p>
        <p>
          {providers &&
            Object.values(providers)
              .filter(p => p.name !== "Credentials")
              .map(provider => {
                if (provider.name === "Email") {
                  return;
                }
                return (
                  <div key={provider.name}>
                    <button onClick={() => signIn(provider.id)}>
                      <Image
                        width={20}
                        height={20}
                        alt="github logo"
                        src="/tools/github.svg"
                      />
                      Sign in with {provider.name}
                    </button>
                  </div>
                );
              })}
        </p>
      </div>
    </div>
  );
};

export default SignIn;
