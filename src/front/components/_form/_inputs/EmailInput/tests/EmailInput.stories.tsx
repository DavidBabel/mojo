import type { Meta, Story } from "@storybook/react";
import React from "react";

import { EmailInput, EmailInputProps } from "../EmailInput.component";

const componentMeta: Meta = {
  component: EmailInput,
  title: "EmailInput",
};
export default componentMeta;

const Template: Story<EmailInputProps> = args => <EmailInput {...args} />;
export const story = Template.bind({});

story.args = {
  disabled: false,
  extra: "extra",
  label: "email",
  name: "email",
  validateStatus: "",
};

story.argTypes = {
  name: { type: "string" },
  validateStatus: {
    control: { type: "radio" },
    options: ["success", "warning", "error", "validating", ""],
  },
};
