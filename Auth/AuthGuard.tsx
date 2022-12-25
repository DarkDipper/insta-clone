import { useRouter } from "next/router";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
function AuthGuard({ children }: { children: JSX.Element }) {
  const { user, initializing, setRedirect } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!initializing) {
      if (!user) {
        console.log("No user");
        setRedirect(router.route);
        router.push("/checkin");
      }
    }
  }, [initializing, router, user, setRedirect]);
  if (initializing) {
    return <Loading />;
  }
  if (!initializing && user) {
    return <>{children}</>;
  }

  return null;
}

export { AuthGuard };
