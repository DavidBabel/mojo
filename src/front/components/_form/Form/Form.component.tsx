import { Form as AntForm, FormProps as AntFormProps } from "antd";

import { FormName } from "~/@types/forms";
import { FormContextProvider } from "~/front/contexts";

const formItemLayout = {
  labelCol: {
    md: { span: 6 },
    sm: { span: 24 },
  },
  wrapperCol: {
    md: { span: 14 },
    sm: { span: 24 },
    xl: { span: 10 },
    xxl: { span: 6 },
  },
};

interface FormProps extends AntFormProps {
  name: FormName;
}

export function Form({ children, style, ...props }: FormProps) {
  const styleDefault = { marginTop: 35, ...style };
  const formContextValue = { formName: props.name ?? "form" };
  return (
    <>
      <AntForm
        autoComplete="off"
        validateTrigger={["onBlur"]}
        {...formItemLayout}
        {...props}
        style={styleDefault}
      >
        <FormContextProvider value={formContextValue}>
          {children}
        </FormContextProvider>
      </AntForm>
    </>
  );
}

Form.Item = AntForm.Item;
