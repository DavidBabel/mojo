import { createContext, useContext } from "react";

import { FormName } from "~/@types/forms";

type FormContextType = {
  formName: FormName;
};

const FormContext = createContext<FormContextType>({} as FormContextType);

export function useFormContext() {
  return useContext(FormContext);
}

export const FormContextProvider = FormContext.Provider;
