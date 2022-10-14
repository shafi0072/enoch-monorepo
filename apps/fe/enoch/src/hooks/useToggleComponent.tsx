import { ReactNode } from "react";

const useToggleComponent = (
  isActive: boolean,
  firstElement: ReactNode,
  SecondComp: ReactNode
) => (isActive ? firstElement : SecondComp);

export default useToggleComponent;
