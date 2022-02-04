import { Rule } from "antd/lib/form";

import { FormFieldName, FormName } from "~/@types/forms";
import {
  nameMaxLength,
  nameMinLength,
  passwordMaxLength,
  passwordMinLength,
} from "~/iso/constant";

export type Rules = Rule[];

const noRule: Rules = [];

const ruleRequiredEmail: Rules = [
  {
    required: true,
    type: "email",
  },
];

const ruleRequiredName: Rules = [
  {
    max: nameMaxLength,
    min: nameMinLength,
    required: true,
  },
];

const ruleRequiredPassword: Rules = [
  {
    max: passwordMaxLength,
    min: passwordMinLength,
    required: true,
  },
];

export const formValidationRules: Record<
  FormName,
  Partial<Record<FormFieldName, Rules>>
> = {
  register: {
    email: ruleRequiredEmail,
    name: ruleRequiredName,
    password: ruleRequiredPassword,
  },
  signin: {
    email: [{ type: "email" }] as Rules,
    password: noRule,
  },
} as const;
