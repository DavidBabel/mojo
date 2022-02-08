import { RollbackOutlined } from "@ant-design/icons";
import type { NextPage } from "next";

import { DebugJson } from "@/_devTools/DebugJson";
import { ButtonLink } from "@/ButtonLink";
import { useSession } from "~/front/hooks";

const ToolsPage: NextPage = () => {
  const session = useSession();

  return (
    <>
      <ButtonLink href="/tools">
        <RollbackOutlined /> Back
      </ButtonLink>

      <DebugJson object={session} />
    </>
  );
};

export default ToolsPage;
