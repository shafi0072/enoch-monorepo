import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { VERIFY_OTP_FOR_CP } from "../../../../graphql/mutations";
import AuthClient from "../../../../services/AuthClient";
import ToastService from "../../../../services/ToastService";
import OtpModule from "../../../core/lib/OtpModule";

interface ChangePhoneNumberProps {
  onClose: () => void;
  setActiveComponent: Dispatch<SetStateAction<string>>;
}

const ValidatePhoneNumber: FC<ChangePhoneNumberProps> = ({
  onClose,
  setActiveComponent,
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [OTPLength, setOTPLength] = useState<number>(6);
  const [OTP, setOTP] = useState<string>("");

  const handleOTP = useCallback(
    (value: any) => {
      setOTP(value);
    },
    [OTP]
  );

  const verifyOTPForCP = useCallback(async () => {
    try {
      const res = await AuthClient.mutation(VERIFY_OTP_FOR_CP, {
        OTP: OTP,
      });
      if (res) {
        setActiveComponent("NEW_PHONE_NUMBER");
      }
    } catch (err: any) {
      ToastService.error(err.message);
    }
  }, [OTP]);

  return (
    <div className="modal-content dapp-change-number">
      <div className="change-no-header">Change my phone number</div>
      <span onClick={onClose} className="close">
        <img src="/images/popupCross.png" alt="close" className="img-fluid" />
      </span>
      <div className="dapp-change-number-nxt">
        <p>
          In order to change your Phone number, we have sent security code on
          your registered mail id.
        </p>
        <div className="change-number-blocks">
          <div className="verfication-key browser-num-key m-0">
            <OtpModule
              numInputs={OTPLength}
              onChange={handleOTP}
              isInputNum
              containerStyle={{
                display: "flex",
                justifyContent: "space-around",
              }}
              inputStyle={{
                borderColor: "#D4D8DD",
                width: "14%",
                height: "56px",
                borderRadius: "2px",
              }}
            />
          </div>
          <div className="d-flex dApp-confirm-btn">
            <a onClick={verifyOTPForCP} className={`btn bttn-primary `}>
              Confirm
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidatePhoneNumber;
