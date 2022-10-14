import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";
import { OnBoardingScreen } from "../../../../constants/onboarding-enums";
import { routes } from "../../../../constants/routes";
import { FETCH_SUGGESTED_COMMUNITIES } from "../../../../graphql/mutations/addOnBoardingDetails";
import AuthService from "../../../../services/AuthService";
import onboardingService from "../../../../services/onboardingService";
import { BusinessImg, BusinessLogo } from "../../../core/index";
import CommunitiesSuggestionCard from "./communitiesSuggestionCard";

const Communities: React.FC<any> = ({ communities }) => {
  const [joinedCommunities, setJoinedCommunities] = useState<any>([]);
  const [suggestedCommunities, setSuggestedComunities] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    getSuggestedCommunities();
  }, [router]);

  const getSuggestedCommunities = async () => {
    const { data } = await onboardingService.fetchAllCommunities();
    setSuggestedComunities(data?.getSuggestedCommunities?.communities || []);
    setJoinedCommunities([
      ...(new Set([
        ...joinedCommunities,
        ...data?.getSuggestedCommunities?.joinedCommunitesArray,
      ]) as any),
    ]);
  };

  const onClickJoinButton = useCallback(
    async (id: any, isJoined) => {
      setJoinedCommunities((prevState: any) => {
        const updatedState = isJoined
          ? prevState.filter((i: string) => i != id)
          : [...(new Set([...prevState, id]) as any)];
        return updatedState || [];
      });
    },
    [joinedCommunities]
  );

  const handleOnNext = useCallback(async () => {
    const response = await onboardingService.addOnboardingInformation(
      {
        communities: joinedCommunities,
        activeOnBoardingScreen: OnBoardingScreen.SubscribeLatestChannels,
      },
      FETCH_SUGGESTED_COMMUNITIES
    );
    if (!response) return;
    await AuthService.updateUser(response?.data?.addOnboardingDetails);
    router.push(routes.newsLetterSuggestionPage);
  }, [joinedCommunities]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="onboarding-new-container container-bg2">
          <div className="onboard-individual-body">
            <BusinessLogo />
            <BusinessImg />
            <div className="onboard-business-innerbody">
              <div className="onboard-business-progressBlock">
                <div className="onboard-business-progressbar">
                  <div className="onboard-business-progressbar-inner progress-65"></div>
                </div>
                <div className="onboard-business-bottmVal">
                  <Link href={routes.addFollowersPage}>
                    <span>
                      <img
                        src="/images/back-arrow.png"
                        className="img-fluid mr-2 p-1"
                        alt="back"
                      />
                      GO BACK
                    </span>
                  </Link>
                  <div className="onboarding-progress-step-count">
                    <strong>3</strong>
                    <span>/5</span>
                  </div>
                </div>
              </div>
              <div className="onboard-business-hd">
                <h2>Communities by topics you’re intrested in</h2>
                <p>
                  We own, publish and serve some of the biggest Social web3.0
                  Communities worldwide. We engage regularly hundreds of
                  influencers to amplify our brand messages and to inspire our
                  users.
                </p>
              </div>
              <div className="onboard-business-communities-block">
                <ul>
                  {suggestedCommunities.map((community: any) => {
                    return (
                      <CommunitiesSuggestionCard
                        key={community._id}
                        community={community}
                        onClickJoinButton={onClickJoinButton}
                      />
                    );
                  })}
                </ul>
              </div>
              <div className="onboard-busines-nxt">
                <button
                  id="selectothers-cont-btn"
                  className="bunsinss-nxt-bttn"
                  onClick={handleOnNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Communities;
