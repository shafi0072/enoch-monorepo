import { useRouter } from "next/router";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { OnBoardingScreen } from "../../../../constants/onboarding-enums";
import { routes } from "../../../../constants/routes";
import AuthService from "../../../../services/AuthService";
import onboardingService from "../../../../services/onboardingService";
import { BusinessImg, BusinessLogo } from "../../../core/index";
import { NewsLettercard, NewsLetter } from "./newsLettercard";
import { FETCH_ALL_NEWSLETTERS } from "../../../../graphql/mutations/addOnBoardingDetails";

const Subscribe: React.FC = () => {
  const [suggestedNewsLetters, setSuggestedNewsLetters] = useState<
    NewsLetter[] | []
  >([]);
  const [selectedNewsLetters, setSelectedNewsLetter] = useState<string[] | []>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    getSuggestedNewsLetters();
  }, []);

  const getSuggestedNewsLetters = useCallback(async () => {
    const { data } = await onboardingService.getSuggestedNewsLetters();
    setSuggestedNewsLetters(data?.getsuggestedNewsChannel?.newsChannels || []);
    const uniqueArray: any[] =
      [
        ...selectedNewsLetters,
        ...data?.getsuggestedNewsChannel?.subscribedChannels,
      ] || [];
    setSelectedNewsLetter([...(new Set(uniqueArray) as any)]);
  }, [suggestedNewsLetters, selectedNewsLetters]);

  const handleNewsLetterSelection = useCallback(
    (id: string, isSelected: boolean) => {
      setSelectedNewsLetter((prevState: any) => {
        const updatedState = isSelected
          ? prevState.filter((i: string) => i != id)
          : [...(new Set([...prevState, id]) as any)];
        return updatedState || [];
      });
    },
    [selectedNewsLetters]
  );

  const handleNextButton = useCallback(async () => {
    const response = await onboardingService.addOnboardingInformation(
      {
        newsChannels: selectedNewsLetters,
        activeOnBoardingScreen: OnBoardingScreen.ChooseAvatar,
      },
      FETCH_ALL_NEWSLETTERS
    );
    if (!response) return;
    AuthService.updateUser(response?.data?.addOnboardingDetails);
    router.push(routes.chooseAvatarPage);
  }, [selectedNewsLetters]);
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
                  <div className="onboard-business-progressbar-inner progress-80"></div>
                </div>
                <div className="onboard-business-bottmVal">
                  <Link href={routes.communitiesPage}>
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
                    <strong>4</strong>
                    <span>/5</span>
                  </div>
                </div>
              </div>
              <div className="onboard-business-hd">
                <h2>Subscribe for latest news </h2>
                <p>
                  Signup to best social commerce based decentralised unlockable
                  content. Some content creators, featured in our social
                  metaverse, also created NFT metadata that Enoch marketplace is
                  minting on Polygon Network, contributing across these NFT
                  based unlockable content bundles— from art to digital fashion
                  to music to collectibles to in-game items.
                </p>
              </div>
              <div className="onboard-business-subscribe-block">
                <div className="onboard-business-subscribe-block-lft">
                  <ul>
                    {suggestedNewsLetters.map((newsLetter) => {
                      return (
                        <NewsLettercard
                          key={newsLetter._id}
                          newsLetter={newsLetter}
                          handleNewsLetterSelection={handleNewsLetterSelection}
                        />
                      );
                    })}
                  </ul>
                </div>
                <div className="onboard-business-subscribe-block-right">
                  <img
                    src="/images/subscribe-img.png"
                    className="img-fluid mr-2"
                    alt="subscribe"
                  />
                </div>
              </div>
              <div className="onboard-busines-nxt">
                <button
                  onClick={handleNextButton}
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
  );
};
export default Subscribe;
