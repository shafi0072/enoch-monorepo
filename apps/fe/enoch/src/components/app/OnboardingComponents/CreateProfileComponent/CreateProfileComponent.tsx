import { useState, FC, useEffect } from "react";
import ChooseAvatarPage from "./ChooseAvatarPage";
import ChooseBackgroundPage from "./ChooseBackgroundPage";
import {
  rpgAvatarImages,
  apocalypseAvatarImages,
  alienAvatarImages,
  rpgbackgroundImageList,
  apocalypsbackgroundImages,
  alienbackgroundImages,
} from "./imageData";
import ProfileConfirmation from "./ProfileConfirmation";

const avatarOptionsList = ["rpg avatar", "apocalypse avatar", "alien avatar"];
const backgroundOptionsList = ["rpg bg", "apocalypse bg", "alien bg"];
const dummyUsernameList = ["Draco", "JohnDoe", "Wowo", "Mike"];

const CreateProfileComponent: FC = () => {
  const [search, setsearch] = useState<string>("");
  const [isValid, setisValid] = useState<boolean>(false);
  const [dropdown, setdropdown] = useState<boolean>(true);
  const [confirmationPop, setconfirmationPop] = useState<boolean>(false);
  const [chooseAvatarpage, setchooseAvatarpage] = useState<boolean>(true);
  const [images, setimages] = useState<Array<string>>([]);
  const [avatarOption, setavatarOption] = useState<string>("rpg avatar");
  const [backgroundOption, setbackgroundOption] = useState<string>("rpg bg");

  const [backgroundImage, setbackgroundImage] = useState<string>(
    "/images/business-user-bg1.png"
  );
  const [avatarImage, setavatarImage] = useState<string>(
    "/images/userAvtar/avatar-default.png"
  );
  const [cardImage, setcardImage] = useState<string>(
    "/images/userAvtar/use-ava-img.png"
  );

  useEffect(() => {
    if (chooseAvatarpage) {
      if (avatarOption === "rpg avatar") {
        setimages(rpgAvatarImages);
      } else if (avatarOption === "apocalypse avatar") {
        setimages(apocalypseAvatarImages);
      } else if (avatarOption === "alien avatar") {
        setimages(alienAvatarImages);
      }
    } else if (chooseAvatarpage === false) {
      if (backgroundOption === "rpg bg") {
        setimages(rpgbackgroundImageList);
      } else if (backgroundOption === "apocalypse bg") {
        setimages(apocalypsbackgroundImages);
      } else if (backgroundOption === "alien bg") {
        setimages(alienbackgroundImages);
      }
    }
  }, [chooseAvatarpage, avatarOption, backgroundOption]);

  useEffect(() => {
    if (dummyUsernameList.includes(search)) {
      setisValid(false);
      setdropdown(true);
    } else {
      setisValid(true);
      setdropdown(false);
    }
  }, [search]);

  return (
    <div className="create_profile">
      {/* logo  */}
      <div className="business-hd-logo">
        <img
          src="/images/businessNewLogo.png"
          className="img-fluid"
          alt="logo"
        />
      </div>
      <div>
        <h2>Create your profile</h2>
        {/* choosing avatar and choosing background */}
        <div
          className="business-user-imgGal"
          style={{
            backgroundImage: "url(" + backgroundImage + ")",
          }}
        >
          <div className="create_profile_input">
            {/* input search */}
            <div className="business-user-select-namme-block">
              <div className="business-user-select-namme-hd">
                <h3>Select username</h3>
                <span>
                  <img
                    src="/images/userAlert.png"
                    className="img-fluid"
                    alt="info"
                  />
                  <div className="businessusr-info-txt">
                    In the case of your username, remember that will have to be
                    unique, you need to be aware of before you change your
                    username. First, your username can only be changed once
                    every 30 days, so make sure it’s one you can live with, at
                    least for that period.
                  </div>
                </span>
              </div>
              {/* searchbox */}
              <div className="business-username-select-box">
                <div className="position-relative">
                  <span className="username-prefix">@</span>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    className="timeSetting-droplist"
                    placeholder="Enter username (Max 11 letters, mix of numbers, and capital & lower letters  )"
                  />
                  {isValid && search.length > 3 && (
                    <span className="username-success">
                      <img
                        src="/images/business-tick.png"
                        className="img-fluid"
                        alt="tick"
                      />
                    </span>
                  )}
                </div>
                <div
                  className={`username-content ${
                    dropdown && "show"
                  } custm-zindex-1`}
                >
                  {dropdown && (
                    <span
                      onClick={() => setdropdown(false)}
                      className="alert-red-cross"
                    >
                      <img
                        src="/images/rdCross.png"
                        className="img-fluid"
                        alt="cross"
                      />
                    </span>
                  )}
                  <div className="username-content-innerbody">
                    <p className="business-username-drop-txt1">
                      <span>
                        <img
                          src="/images/redalert.png"
                          className="img-fluid"
                          alt="icon"
                        />
                      </span>
                      This username is already taken
                    </p>
                    <p className="business-username-drop-txt2">
                      Suggestion; Riddler22, Riddler45, Riddler33
                    </p>
                  </div>
                </div>
              </div>
              <p>
                You can not change or apply Avatar or Background untill u choose
                a username .
              </p>
            </div>
          </div>
          {/* choose avatar and choose background */}
          <div className="changeuserImg-modal-content-inner">
            <div className="create_profile_pageswitch">
              <div
                className={`changeuserImg-tablinks ${
                  chooseAvatarpage && "active"
                }`}
                onClick={() => setchooseAvatarpage(true)}
              >
                Select your avatar
              </div>
              <div
                className={`changeuserImg-tablinks ${
                  !chooseAvatarpage && "active"
                }`}
                onClick={() => setchooseAvatarpage(false)}
              >
                Change background image
              </div>
            </div>
            {/* avatar and background options*/}
            <div className="create_profile_options">
              {(chooseAvatarpage
                ? avatarOptionsList
                : backgroundOptionsList
              ).map((option, index) => (
                <button
                  key={index}
                  onClick={
                    chooseAvatarpage
                      ? () => setavatarOption(option)
                      : () => setbackgroundOption(option)
                  }
                  className={`changeuserImg-Innertablinks-av ${
                    (chooseAvatarpage ? avatarOption : backgroundOption) ===
                      option && "active"
                  }`}
                  style={{ textTransform: "uppercase" }}
                >
                  {option}
                </button>
              ))}
            </div>
            {chooseAvatarpage ? (
              <ChooseAvatarPage
                images={images}
                name={search}
                avatarImage={avatarImage}
                setavatarImage={setavatarImage}
                cardImage={cardImage}
                setcardImage={setcardImage}
              />
            ) : (
              <ChooseBackgroundPage
                images={images}
                setbackgroundImage={setbackgroundImage}
              />
            )}
          </div>
          <div className="changeuserImg-continue">
            <button
              onClick={() => setconfirmationPop(true)}
              className="changeuserImg-continue-btn"
            >
              Continue
            </button>
          </div>
          <div className="changeuserImg-continue">
            <button
              onClick={() => setconfirmationPop(true)}
              className="changeuserImg-continue-btn"
            >
              Continue
            </button>
          </div>
        </div>
        <ProfileConfirmation confirmationPop={confirmationPop} />
      </div>
    </div>
  );
};

export default CreateProfileComponent;
