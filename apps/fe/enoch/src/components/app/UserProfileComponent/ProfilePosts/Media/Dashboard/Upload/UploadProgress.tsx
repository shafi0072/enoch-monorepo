import React, { useEffect } from "react";
import useUploadProgress from "../../../../../../../hooks/useUploadProgress";

const UploadProgress = ({ fileName }: any) => {
  const { percentage, status, startTimer } = useUploadProgress();

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <>
      <div className="avex_upld">
        <ul>
          <li>
            <div className="Find-start_uploading">
              <div className="Find-upload_progress">
                <img
                  src="images/green_progress.png"
                  alt="img"
                  className="img-fluid alrt_circle"
                />
                <span className="uplad_img_full">{percentage}%</span>
              </div>
              <div className="upload-list-text">
                <div className="upld_icon_done">
                  <h4>{status}</h4>
                  <span className="upload_icon">
                    <img
                      className="Upload-small_icn"
                      src="images/Upload-smll_Icon.png"
                      alt=""
                    />
                  </span>
                </div>
                <p>
                  {fileName}
                  <a className="link_share" href="#">
                    Copy link to share
                  </a>
                </p>
              </div>
            </div>
            <div className="Find-start-conversation-Chat-list-btns">
              <div className="uplod-cus">
                <img
                  src="images/cus_cross.png"
                  alt="icon"
                  className="img-fluid cros_upload"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UploadProgress;
