import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { LoadingOrError } from "@/LoadingOrError";
import { useSession } from "~/front/hooks";
import VideoPlayPage from "~/pages/videos/[videoId].page";

const AdminUserPage: NextPage = () => {
  const { t } = useTranslation();
  const { isAdmin } = useSession();

  if (!isAdmin()) {
    return <LoadingOrError error={t("backend-errors.unauthorized")} />;
  }

  return (
    <>
      <VideoPlayPage />
    </>
  );
};

export default AdminUserPage;
