import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import type { NextPage } from "next";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";
import { ButtonLink } from "@/ButtonLink";
import { LoadingOrError } from "@/LoadingOrError";
import { User } from "~/@types/generated/graphqlTypes";
import { useUsersQuery } from "~/front/gql/queries/useAllUsers.query";
import { useSession } from "~/front/hooks";
import { AuthProviders } from "~/iso/enums";

const AdminUsersPage: NextPage = () => {
  const { t } = useTranslation();
  const { isAdmin } = useSession();
  const { data, loading, error } = useUsersQuery();

  const columns = useMemo(() => {
    const columnsBuild: ColumnProps<User>[] = [
      {
        dataIndex: "name",
        title: t("pages.admin-users.columns.name"),
      },
      {
        dataIndex: "email",
        title: t("pages.admin-users.columns.email"),
      },
      {
        render: (row: User) =>
          row?.oAuthId ? AuthProviders.Github : AuthProviders.Credentials,
        title: t("pages.admin-users.columns.account-type"),
      },
      {
        render: (row: User) => row.videos.length,
        title: t("pages.admin-users.columns.videos-count"),
      },
      {
        render: (row: User) => (
          <ButtonLink href={`/admin/user/${row.id}`}>
            {t("pages.admin-users.columns.videos-shows")}
          </ButtonLink>
        ),
        title: t("pages.admin-users.columns.videos-shows"),
      },
    ].map((e, index) => ({ ...e, key: `table-row-${index}` }));
    return columnsBuild;
  }, [t]);

  const users = data?.users;

  if (error || !isAdmin()) {
    return <LoadingOrError error={error ?? t("backend-errors.unauthorized")} />;
  }

  return (
    <>
      <Title>{t("pages.admin-users.title")}</Title>

      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        size="small"
      />
    </>
  );
};

export default AdminUsersPage;
