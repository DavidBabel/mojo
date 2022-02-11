import { EditOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import {
  EmailInput,
  Form,
  FormContent,
  PasswordInput,
  SubmitButton,
  UserInput,
} from "@/_form";
import { Paragraph } from "@/_layout/antd.exports";
import { Title } from "@/_layout/Title";
import { LoadingOrError } from "@/LoadingOrError";
import { User, UserUpdateInput } from "~/@types/generated/graphqlTypes";
import { useUserUpdateMutation } from "~/front/gql/mutations";
import { useOneUserQuery } from "~/front/gql/queries";
import { useSession } from "~/front/hooks";
import {
  openErrorNotification,
  openSuccessNotification,
} from "~/front/lib/notifications";
import { AuthProviders } from "~/iso/enums";

const AccountPage: NextPage = () => {
  const { t } = useTranslation();
  const { user: sessionUser, provider, sessionLoading } = useSession();
  const userId = sessionUser?.id ?? "";

  const [updateUser, { loadingUserUpdate }] = useUserUpdateMutation();

  const {
    data,
    error,
    loading: loadingUserQuery,
    refetch,
  } = useOneUserQuery(userId);
  const user: MaybeNull<Maybe<User>> = data?.findFirstUser;

  const onAccountEdit = useCallback(
    async function handleAccountEdit(values: UserUpdateInput) {
      await updateUser(userId, values)
        .then(async () => {
          openSuccessNotification(
            t("pages.account.notifications.edit-success"),
          );
          await refetch();
        })
        .catch(openErrorNotification)
        .finally();
    },
    [refetch, t, updateUser, userId],
  );

  const loading = sessionLoading || loadingUserQuery;
  if (loading || error) {
    return <LoadingOrError error={error} />;
  }

  const isDemoAccount = ["admin@admin.io", "user@user.io"].includes(
    String(user?.email),
  );

  const isOAuthAccount = provider !== AuthProviders.Credentials;
  const isFormDisabled = isDemoAccount || isOAuthAccount;

  return (
    <>
      <Title>{t("pages.account.title")}</Title>
      {isDemoAccount && (
        <FormContent>
          <Paragraph>⚠️ {t("pages.account.demo-account-warning")}</Paragraph>
        </FormContent>
      )}
      {isOAuthAccount && (
        <FormContent>
          <Paragraph>{t("pages.account.cannot-edit")}</Paragraph>
        </FormContent>
      )}
      <Form
        initialValues={user ?? {}}
        name="account-edit"
        onFinish={onAccountEdit}
      >
        <UserInput disabled={isFormDisabled} />
        <EmailInput disabled />
        <PasswordInput
          disabled={isFormDisabled}
          extra={t("pages.account.password-extra")}
          placeholder="••••••••"
        />
        <FormContent>
          {t("pages.account.video-count", { count: user?.videos?.length })}
        </FormContent>
        <FormContent>
          <SubmitButton disabled={isFormDisabled} loading={loadingUserUpdate}>
            <EditOutlined />
            {t("pages.account.submit")}
          </SubmitButton>
        </FormContent>
      </Form>
    </>
  );
};

export default AccountPage;
