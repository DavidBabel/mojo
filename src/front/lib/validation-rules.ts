import { Rule } from "antd/lib/form";

import {
  nameMaxLength,
  nameMinLength,
  passwordMaxLength,
  passwordMinLength,
  videoDescriptionMaxLength,
  videoDescriptionMinLength,
  videoTitleMaxLength,
  videoTitleMinLength,
} from "~/iso/constant";

export type Rules = Rule[];

export const noRule: Rules = [];

export const ruleRequiredEmail: Rules = [
  {
    required: true,
    type: "email",
  },
];

export const ruleValidEmail: Rules = [{ type: "email" }];

export const ruleRequiredName: Rules = [
  {
    max: nameMaxLength,
    min: nameMinLength,
    required: true,
  },
];

export const ruleRequiredPassword: Rules = [
  {
    max: passwordMaxLength,
    min: passwordMinLength,
    required: true,
  },
];

export const videoTitleRules: Rules = [
  {
    max: videoTitleMaxLength,
    min: videoTitleMinLength,
    required: true,
  },
];

export const videoDescriptionRules: Rules = [
  {
    max: videoDescriptionMaxLength,
    min: videoDescriptionMinLength,
  },
];

export const videoFileRules: Rules = [
  {
    required: true,
  },
];
