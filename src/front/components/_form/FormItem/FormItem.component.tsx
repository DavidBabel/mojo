import { type FormItemProps as AntFormItemProps, Form } from "antd";
import { useTranslation } from "react-i18next";

import { FormFieldName } from "~/@types/forms";
import { useFormContext } from "~/front/contexts";
import { formValidationRules } from "~/front/lib/formValidation.rules";

const { Item } = Form;

export interface FormItemProps extends AntFormItemProps {
  name?: FormFieldName;
}

export function FormItem({ name, label, ...props }: FormItemProps) {
  const { t } = useTranslation();
  const { formName } = useFormContext();

  label = label ?? t(`forms__dynamic.${formName}.${name}` as any) ?? name;
  const rules = formValidationRules?.[formName]?.[name!] ?? [];

  return (
    <>
      <Item
        //hasFeedback
        label={label}
        name={name}
        rules={rules}
        {...props}
      />
    </>
  );
}
