import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { LoadingOrError } from "@/LoadingOrError";
import { useSession, useUserIdRouter } from "~/front/hooks";
import VideoPage from "~/pages/videos/videos.page";

const AdminUserPage: NextPage = () => {
  const { t } = useTranslation();
  const { userId } = useUserIdRouter();
  const { isAdmin } = useSession();

  if (!isAdmin()) {
    return <LoadingOrError error={t("backend-errors.unauthorized")} />;
  }

  return (
    <>
      <VideoPage isAdminMode userId={userId} />
    </>
  );
};

export default AdminUserPage;
