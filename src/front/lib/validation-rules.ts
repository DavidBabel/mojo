import { Rule } from "antd/lib/form";

import * as c from "~/iso/constant";

export type Rules = Rule[];

export const noRule: Rules = [];
export const required: Rules = [
  {
    required: true,
  },
];

export const ruleRequiredEmail: Rules = [
  {
    required: true,
    type: "email",
  },
];

export const ruleValidEmail: Rules = [{ type: "email" }];

export const ruleName: Rules = [
  {
    max: c.nameMaxLength,
    min: c.nameMinLength,
  },
];

export const ruleSubscribeName: Rules = [
  {
    ...ruleName[0],
    required: c.nameRequired,
  },
];

export const rulePassword: Rules = [
  {
    max: c.passwordMaxLength,
    min: c.passwordMinLength,
  },
];

export const ruleRequiredPassword: Rules = [
  {
    ...rulePassword[0],
    required: true,
  },
];

export const videoTitleRules: Rules = [
  {
    max: c.videoTitleMaxLength,
    min: c.videoTitleMinLength,
    required: c.videoTitleRequired,
  },
];

export const videoDescriptionRules: Rules = [
  {
    max: c.videoDescriptionMaxLength,
    min: c.videoDescriptionMinLength,
  },
];

export const videoFileRules: Rules = required;
