import { FormFieldName, FormName } from "~/@types/forms";
import * as r from "~/front/lib/validation-rules";

export const formValidationRules: Record<
  FormName,
  Partial<Record<FormFieldName, r.Rules>>
> = {
  "account-edit": {
    email: r.ruleValidEmail,
    name: r.ruleName,
    password: r.rulePassword,
  },
  register: {
    email: r.ruleRequiredEmail,
    name: r.ruleRequiredName,
    password: r.ruleRequiredPassword,
  },
  signin: {
    email: r.ruleValidEmail,
    password: r.noRule,
  },
  "video-edit": {
    description: r.videoDescriptionRules,
    title: r.videoTitleRules,
  },
  "video-upload": {
    description: r.videoDescriptionRules,
    title: r.videoTitleRules,
    video: r.videoFileRules,
  },
} as const;
