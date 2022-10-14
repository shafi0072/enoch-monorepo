import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import HeaderStyles from "./Header.module.css";

interface MainMenuButtonProps {
  icon?: JSX.Element;
  dropdown?: boolean;
  label: string;
  onClick?: () => void;
  dropdownIcon?: boolean;
}

const MainMenuButton = ({
  icon,
  dropdown = false,
  label,
  onClick,
  dropdownIcon = false,
}: MainMenuButtonProps) => {
  return (
    <button
      className={HeaderStyles.mainmenubtn}
      onClick={onClick}
      style={{
        background: dropdownIcon
          ? dropdown
            ? ""
            : "linear-gradient(90deg, #6E16E0 1.96%, #841ADA 22.44%, #D528C2 100%)"
          : "",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
        }}
      >
        {icon && (
          <span
            style={{
              backgroundColor: "#F8F8F9",
              borderRadius: "100%",
              height: "20px",
              width: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon && icon}
          </span>
        )}
        <span style={{ color: dropdownIcon ? (dropdown ? "" : "white") : "" }}>
          {label}
        </span>
      </div>
      {dropdownIcon ? (
        dropdown ? (
          <MdArrowDropDown size={23} />
        ) : (
          <MdArrowDropUp size={23} />
        )
      ) : null}
    </button>
  );
};

export default MainMenuButton;
