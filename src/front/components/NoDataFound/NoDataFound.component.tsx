import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Title } from "@/_layout/Title";
import { LoadingOrError } from "@/LoadingOrError";
import { useTimeout } from "~/front/hooks";
import { sec } from "~/iso/numbers/timeMs";

interface Props {
  dataName: string;
}

export function NoDataFound({ dataName }: Props) {
  const { t } = useTranslation();
  const [forceLoadingState, setForceLoadingState] = useState(true);

  // we do that because data comes 1s after loading is set to false
  // the 3s timeout is only reached in case of error (no data)
  useTimeout(3 * sec, () => setForceLoadingState(false));
  if (forceLoadingState) {
    return <LoadingOrError />;
  }

  return (
    <>
      <Title>{t("components.NoDataFound.title")}</Title>
      <p>{t("components.NoDataFound.no-data-found", { dataName })}</p>
    </>
  );
}
