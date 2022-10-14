import type { NextPage } from "next";
import HomePage from "../src/components/app/ProtectedComponents/HomeComponent";
import LoggedInUser from "../src/components/core/components/LoggedInUser";

const Home: NextPage = () => {
  return (
    <LoggedInUser>
      <HomePage />
    </LoggedInUser>
  );
};

export default Home;
