import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ErrorPage = (): JSX.Element => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }, []);
  return (
    <div>
      <p>This page was not found, return to the</p>
      <p>
        {" "}
        Return <Link href={"/"}> on main page</Link>{" "}
      </p>
    </div>
  );
};

export default ErrorPage;
