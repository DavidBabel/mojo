import { useMutation } from "@apollo/client";
import { Form, Input } from "antd";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";
import { SubmitButton } from "@/SubmitButton";
import type {
  Mutation,
  MutationRegisterNewUserArgs,
} from "~/@types/generated/graphqlTypes";
import { REGISTER_NEW_USER_MUTATION } from "~/front/gql/mutation/registerNewUser.mutation";
import { passwordMaxLength, passwordMinLength } from "~/iso/constant";

const { Item } = Form;

const LoginPage: NextPage = () => {
  const { t } = useTranslation();
  const [registerNewUser] = useMutation<Mutation, MutationRegisterNewUserArgs>(
    REGISTER_NEW_USER_MUTATION,
  );

  const onFinish = (values: any) => {
    registerNewUser({ variables: { ...values } })
      .then(() => alert("success"))
      .catch(err => alert(`error ${err}`));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const offset = 8;
  const span = 8;

  return (
    <>
      <Title>{t("pages.register.title")}</Title>
      <Form
        name="login"
        labelCol={{ span: offset }}
        wrapperCol={{ span }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ marginTop: 90 }}
      >
        <Item
          label={t("pages.register.email")}
          name="email"
          rules={[
            {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            },
          ]}
        >
          <Input />
        </Item>

        <Item
          label={t("pages.register.password")}
          name="password"
          rules={[
            {
              required: true,
              min: passwordMinLength,
              max: passwordMaxLength,
            },
          ]}
        >
          <Input.Password />
        </Item>

        <Item
          label={t("pages.register.name")}
          name="name"
          rules={[
            {
              required: true,
              min: 3,
              max: 16,
            },
          ]}
        >
          <Input />
        </Item>

        <Item wrapperCol={{ offset, span }}>
          <SubmitButton />
        </Item>
      </Form>
    </>
  );
};

export default LoginPage;
