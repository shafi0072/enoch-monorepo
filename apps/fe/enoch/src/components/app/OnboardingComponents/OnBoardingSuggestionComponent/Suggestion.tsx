import { useCallback, useEffect, useState } from "react";
import { BusinessImg, BusinessLogo } from "../../../core/index";
import SuggestedUsersCard from "./SuggestedUsersCard";
import onboardingService from "../../../../services/onboardingService";
import { OnBoardingScreen } from "../../../../constants/onboarding-enums";
import { useRouter } from "next/router";
import { routes } from "../../../../constants/routes";
import { FETCH_ALL_NEWSLETTERS } from "../../../../graphql/mutations/addOnBoardingDetails";
import Link from "next/link";

const Suggestion: React.FC<any> = ({}) => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getsuggestedUsers();
  }, []);

  const removeFromSuggestedList = useCallback(
    (id: string) => {
      const newSuggestedUsers = suggestedUsers.filter(
        (user: any) => user._id != id
      );
      setSuggestedUsers(newSuggestedUsers);
    },
    [suggestedUsers]
  );

  const getsuggestedUsers = useCallback(async () => {
    const users = await onboardingService.getSuggestedUsers();
    setSuggestedUsers(users?.data?.getSuggestedUsers || []);
  }, []);

  const onClickFollowButton = useCallback(
    async (isFollowing: boolean, id: string) => {
      if (isFollowing) {
        await onboardingService.unfollowUser(id);
        return;
      }
      await onboardingService.followUser(id);
    },
    []
  );

  const onClickNextButton = useCallback(async () => {
    const response = await onboardingService.addOnboardingInformation({
      activeOnBoardingScreen: OnBoardingScreen.SelectInterestedCommunities,
    });
    if (!response) return;
    router.push(routes.communitiesPage);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="onboarding-new-container container-bg2">
            <div className="onboard-individual-body">
              <BusinessLogo />
              <BusinessImg />
              <div className="onboard-business-innerbody">
                <div className="onboard-business-progressBlock">
                  <div className="onboard-business-progressbar">
                    <div className="onboard-business-progressbar-inner progress-57"></div>
                  </div>
                  <div className="onboard-business-bottmVal">
                    <Link href={routes.selectIndustryOrInterest}>
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
                      <strong>2</strong>
                      <span>/5</span>
                    </div>
                  </div>
                </div>
                <div className="onboard-business-hd">
                  <h2>Suggestion for you to follow </h2>
                  <p>Users you may be interested in</p>
                </div>
                <div className="onboard-business-suggestFollow-block_avex">
                  <ul>
                    {suggestedUsers
                      ? suggestedUsers.map((user: any) => {
                          return (
                            <SuggestedUsersCard
                              user={user}
                              removeFromSuggestedList={removeFromSuggestedList}
                              onClickFollowButton={onClickFollowButton}
                            />
                          );
                        })
                      : null}
                  </ul>
                </div>
                <div className="onboard-busines-nxt">
                  <button
                    onClick={onClickNextButton}
                    id="selectothers-cont-btn"
                    className="bunsinss-nxt-bttn"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Suggestion;
