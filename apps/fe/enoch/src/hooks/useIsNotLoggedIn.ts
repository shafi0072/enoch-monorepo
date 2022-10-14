import { useRouter } from 'next/router';
import {useEffect} from 'react';
import { routes } from '../constants/routes';
import AuthService from '../services/AuthService';

const useIsNotLoggedIn = () => {
  if (typeof window === "undefined") {
    return {isLoggedIn: false};
  }
  const router = useRouter();
  useEffect(() => {
    if (AuthService.loggedIn()) {
      router.push(routes.onboarding);
    }
  }, []);

  return {isLoggedIn: AuthService.loggedIn()};

}

export default useIsNotLoggedIn;
