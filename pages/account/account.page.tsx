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

const AccountPage: NextPage = () => {
  const { t } = useTranslation();
  const { user: sessionUser } = useSession();
  const userId = sessionUser?.id ?? "";

  const [updateUser, { loadingUserUpdate }] = useUserUpdateMutation();

  const {
    data,
    error,
    loading: loadingUserQuery,
    refetch,
  } = useOneUserQuery(userId);
  const user: MaybeNull<Maybe<User>> = data?.findFirstUser;

  if (loadingUserQuery || error) {
    return <LoadingOrError error={error} loading={loadingUserQuery} />;
  }

  const onFinish = async (values: UserUpdateInput) => {
    if (loadingUserUpdate) return;
    await updateUser(userId, values)
      .then(async () => {
        openSuccessNotification(
          t("pages.videos-edit.notifications.edit-success"),
        );
        await refetch();
      })
      .catch(openErrorNotification)
      .finally();
  };

  const isDemoAccount = ["admin@admin.io", "user@user.io"].includes(
    String(user?.email),
  );

  return (
    <>
      <Title>{t("pages.account.title")}</Title>
      {isDemoAccount && (
        <FormContentWrapper>
          <Paragraph>⚠️ {t("pages.account.demo-account-warning")}</Paragraph>
        </FormContentWrapper>
      )}
      <Form initialValues={user ?? {}} name="account-edit" onFinish={onFinish}>
        <UserInput disabled={isDemoAccount} />
        <EmailInput disabled />
        <PasswordInput
          disabled={isDemoAccount}
          extra={t("pages.account.password-extra")}
          placeholder="••••••••"
        />
        <FormContentWrapper>
          {t("pages.account.video-count", { count: user?.videos?.length })}
        </FormContentWrapper>
        <FormContentWrapper>
          <SubmitButton disabled={isDemoAccount} loading={loadingUserUpdate}>
            <EditOutlined />
            {t("pages.account.submit")}
          </SubmitButton>
        </FormContentWrapper>
      </Form>
    </>
  );
};

export default AccountPage;
