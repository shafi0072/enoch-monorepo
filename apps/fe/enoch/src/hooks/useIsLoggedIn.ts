import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { routes } from "../constants/routes";
import AuthService from "../services/AuthService";

const useIsLoggedIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  if (typeof window === "undefined") {
    return { isLoggedIn: false, isLoading };
  }
  const router = useRouter();
  useEffect(() => {
    if (!AuthService.loggedIn()) {
      router.push(routes.login).then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isLoggedIn: AuthService.loggedIn(), isLoading };
};

export default useIsLoggedIn;
