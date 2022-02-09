import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirect: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/videos");
  }, [router]);
  return <></>;
};
export default Redirect;
