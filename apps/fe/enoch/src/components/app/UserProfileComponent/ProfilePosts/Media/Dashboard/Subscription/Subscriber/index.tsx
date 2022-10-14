import React, { useCallback, useState } from "react";
import Subscribers from "./Subscribers";
import Terms from "./Terms";

const Subscriber = () => {
  const [showTerms, setShowTerms] = useState<boolean>(true);
  const showSubscriber = useCallback(() => {
    setShowTerms(false);
  }, []);
  return <>{showTerms ? <Terms {...{ showSubscriber }} /> : <Subscribers />}</>;
};

export default Subscriber;
