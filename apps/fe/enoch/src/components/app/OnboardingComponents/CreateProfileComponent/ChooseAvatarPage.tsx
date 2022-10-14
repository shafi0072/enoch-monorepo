import { Dispatch, FC, SetStateAction, useState } from "react";
import CreateProfilePopUp from "./CreateProfilePopUp";

interface ChooseAvatarProps {
  images: Array<string>;
  name: string;
  avatarImage: string;
  setavatarImage: Dispatch<SetStateAction<string>>;
  cardImage: string;
  setcardImage: Dispatch<SetStateAction<string>>;
}

const ChooseAvatarPage: FC<ChooseAvatarProps> = ({
  images,
  name,
  avatarImage,
  setavatarImage,
  cardImage,
  setcardImage,
}: ChooseAvatarProps) => {
  const [popUp, setpopUp] = useState<boolean>(false);

  console.log(cardImage);

  const handleClose = () => {
    setpopUp(false);
  };

  const handlePopUp = (image: string) => {
    setpopUp(true);
    setavatarImage(image);
  };
  return (
    <div className="choose_avatar">
      {/* main image */}
      <div className="choose_avatar_main_image">
        <img src={cardImage} className="img-fluid" alt="avatar" />
        <span className="choose_avatar_default_img">
          <img
            src={avatarImage}
            // src="/images/userAvtar/avatar-default.png"
            className="img-fluid"
            alt="avatar"
          />
        </span>
        <p className="choose_avatar_title">{name ? name : "Hulk66"}</p>
      </div>
      {/* avatar list */}
      <div className="choose_avatar_images">
        {images.map((image, index) => (
          <img
            onClick={() => handlePopUp(image)}
            key={index}
            src={image}
            alt=""
            className="img-fluid"
          />
        ))}
      </div>
      <CreateProfilePopUp
        popUp={popUp}
        onClose={handleClose}
        name={name}
        avatarImage={avatarImage}
        cardImage={cardImage}
        setcardImage={setcardImage}
      />
    </div>
  );
};

export default ChooseAvatarPage;
