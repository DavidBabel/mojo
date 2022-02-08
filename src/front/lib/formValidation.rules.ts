import { FormFieldName, FormName } from "~/@types/forms";
import {
  noRule,
  ruleRequiredEmail,
  ruleRequiredName,
  ruleRequiredPassword,
  Rules,
  ruleValidEmail,
  videoDescriptionRules,
  videoFileRules,
  videoTitleRules,
} from "~/front/lib/validation-rules";

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
    email: ruleValidEmail,
    password: noRule,
  },
  "video-edit": {
    description: videoDescriptionRules,
    title: videoTitleRules,
  },
  "video-upload": {
    description: videoDescriptionRules,
    title: videoTitleRules,
    video: videoFileRules,
  },
} as const;
