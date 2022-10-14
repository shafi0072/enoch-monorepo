type TabPropsTypes = {
  activeComponent: string | number;
  tabName: string | number;
  children: any;
};
const Tab = ({ activeComponent, tabName, children }: TabPropsTypes) => {
  if (tabName !== activeComponent) {
    return null;
  }
  return children;
};

export default Tab;
