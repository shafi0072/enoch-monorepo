import { Dispatch, SetStateAction, useState } from "react";

interface PopUpProps {
  onClose: () => void;
  name: string;
  popUp: boolean;
  avatarImage: string;
  cardImage?: string;
  setcardImage: Dispatch<SetStateAction<string>>;
}

const CreateProfilePopUp = ({
  onClose,
  name,
  popUp,
  avatarImage,
  cardImage,
  setcardImage,
}: PopUpProps) => {
  const [cardTitle, setcardTitle] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(cardTitle);
  };

  return (
    <div className="changeuser-modal-block">
      <div
        id="changeImg-Modal"
        className={`modal changeuser-img-modal ${popUp && "open"}`}
      >
        <div className="modal-dialog">
          <div className="modal-content changeuser-modal-content">
            <span className="changeImg-close" onClick={onClose}>
              <img
                src="/images/proClose.png"
                alt="close"
                className="img-fluid"
                data-dismiss="modal"
              />
            </span>
            <h3>Choose your card &amp; title</h3>
            <div className="userImg-modal-gall2">
              <div className="userImg-modal-gall-lft">
                <div className="userImg-gall-lft">
                  <ul>
                    <li
                      onClick={() =>
                        setcardImage("/images/userAvtar/use-ava-img.png")
                      }
                    >
                      <div className="userchangeAvImg-inner-block">
                        <div className="userchangeAvImg-overFrame">
                          <img
                            src="/images/userAvtar/use-ava-img.png"
                            className="img-fluid"
                            alt="avatar"
                          />
                        </div>
                        <span className="userchangeAvImg-avatr userchangeAvImg-card3-img">
                          <img
                            src={avatarImage}
                            className="img-fluid"
                            alt="avatar"
                          />
                        </span>
                        <p className="userchangeAvImg-lfttitle1">
                          {name ? name : "Hulk66"}
                        </p>
                        <div className="userchangeAvImg-bio-lfttxt1">
                          Card title...
                        </div>
                      </div>
                    </li>

                    <li
                      onClick={() =>
                        setcardImage("/images/userAvtar/use-ava-img3.png")
                      }
                    >
                      <div className="userchangeAvImg-inner-block">
                        <div className="userchangeAvImg-overFrame">
                          <img
                            src="/images/userAvtar/use-ava-img3.png"
                            className="img-fluid"
                            alt="avatar"
                          />
                        </div>
                        <span className="userchangeAvImg-avatr userchangeAvImg-card2-img">
                          <img
                            src={avatarImage}
                            className="img-fluid"
                            alt="avatar"
                          />
                        </span>
                        <p className="userchangeAvImg-lfttitle2">
                          {name ? name : "Hulk66"}
                        </p>
                        <div className="userchangeAvImg-bio-lfttxt2">
                          Card title...
                        </div>
                      </div>
                    </li>
                    <li
                      onClick={() =>
                        setcardImage("/images/userAvtar/use-ava-img2.png")
                      }
                    >
                      <div className="userchangeAvImg-inner-block">
                        <div className="userchangeAvImg-overFrame">
                          <img
                            src="/images/userAvtar/use-ava-img2.png"
                            className="img-fluid"
                            alt="avatar"
                          />
                        </div>
                        <span className="userchangeAvImg-avatr userchangeAvImg-card1-img">
                          <img
                            src={avatarImage}
                            className="img-fluid"
                            alt="avatar"
                          />
                        </span>
                        <p className="userchangeAvImg-lfttitle3">
                          {name ? name : "Hulk66"}
                        </p>
                        <div className="userchangeAvImg-bio-lfttxt3">
                          Card title...
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* main card image */}
                <div className="userImg-gall-right">
                  <div className="userchangeAvImg-inner-block">
                    <div className="userchangeAvImg-overFrame">
                      <img src={cardImage} className="img-fluid" alt="avatar" />
                    </div>
                    <span className="userchangeAvImg-avatr userchangeAvImg-card2-img">
                      <img
                        src={avatarImage}
                        className="img-fluid"
                        alt="avatar"
                      />
                    </span>
                    <p className="userchangeAvImg-card2-title">
                      {name ? name : "Hulk66"}
                    </p>
                    <div className="userchangeAvImg-card2-bio-txt">
                      <textarea
                        placeholder="Card  title...|"
                        value={cardTitle}
                        onChange={(e) => setcardTitle(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="userImg-modal-gall-right">
                <h3>Instructions!</h3>
                <ul>
                  <li>
                    <span>1</span>Select your choice of card
                  </li>
                  <li>
                    <span>2</span>Write a title for your card. Max 16
                    characters.
                  </li>
                </ul>
                <div className="changeuserImg-confirm">
                  <button
                    onClick={handleSubmit}
                    className="changeuserImg-continue-btn"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfilePopUp;
