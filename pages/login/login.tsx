import { Checkbox, Form, Input } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { Title } from "@/_layout/Title";
import { SubmitButton } from "@/SubmitButton";

const { Item } = Form;

const LoginPage: NextPage = () => {
  const { query } = useRouter();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const offset = 10;
  const span = 4;

  return (
    <>
      <Title>Login (only design / not implemented yet)</Title>
      <Form
        name="login"
        labelCol={{ span: offset }}
        wrapperCol={{ span }}
        initialValues={{
          ...query,
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{ marginTop: 90 }}
      >
        <Item
          label="Login email"
          name="email"
          rules={[
            { required: true, message: "Please input your login email!" },
          ]}
        >
          <Input />
        </Item>

        <Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Item>

        <Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset, span }}
        >
          <Checkbox>Remember me</Checkbox>
        </Item>

        <Item wrapperCol={{ offset, span }}>
          <SubmitButton />
        </Item>
      </Form>
    </>
  );
};

export default LoginPage;
