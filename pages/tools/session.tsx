import { RollbackOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import { ButtonLink } from "@/ButtonLink";

const ToolsPage: NextPage = () => {
  const session = useSession();

  return (
    <>
      <ButtonLink href="/tools">
        <RollbackOutlined /> Back
      </ButtonLink>

      <pre>
        <code lang="json">{JSON.stringify(session, null, 2)}</code>
      </pre>
    </>
  );
};

export default ToolsPage;
