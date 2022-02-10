import { EditOutlined } from "@ant-design/icons";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import {
  EmailInput,
  Form,
  FormContentWrapper,
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

  const loading = sessionLoading || loadingUserQuery;
  if (loading || error) {
    return <LoadingOrError error={error} />;
  }

  const onFinish = async (values: UserUpdateInput) => {
    if (loadingUserUpdate) return;
    await updateUser(userId, values)
      .then(async () => {
        openSuccessNotification(t("pages.account.notifications.edit-success"));
        await refetch();
      })
      .catch(openErrorNotification)
      .finally();
  };

  const isDemoAccount = ["admin@admin.io", "user@user.io"].includes(
    String(user?.email),
  );

  const isOAuthAccount = provider !== AuthProviders.Credentials;
  const isFormDisabled = isDemoAccount || isOAuthAccount;

  return (
    <>
      <Title>{t("pages.account.title")}</Title>
      {isDemoAccount && (
        <FormContentWrapper>
          <Paragraph>⚠️ {t("pages.account.demo-account-warning")}</Paragraph>
        </FormContentWrapper>
      )}
      {isOAuthAccount && (
        <FormContentWrapper>
          <Paragraph>{t("pages.account.cannot-edit")}</Paragraph>
        </FormContentWrapper>
      )}
      <Form initialValues={user ?? {}} name="account-edit" onFinish={onFinish}>
        <UserInput disabled={isFormDisabled} />
        <EmailInput disabled />
        <PasswordInput
          disabled={isFormDisabled}
          extra={t("pages.account.password-extra")}
          placeholder="••••••••"
        />
        <FormContentWrapper>
          {t("pages.account.video-count", { count: user?.videos?.length })}
        </FormContentWrapper>
        <FormContentWrapper>
          <SubmitButton disabled={isFormDisabled} loading={loadingUserUpdate}>
            <EditOutlined />
            {t("pages.account.submit")}
          </SubmitButton>
        </FormContentWrapper>
      </Form>
    </>
  );
};

export default AccountPage;
