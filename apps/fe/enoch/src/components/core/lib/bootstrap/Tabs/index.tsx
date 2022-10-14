import React, { useState } from "react";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Nav, NavItem, NavLink, Tab } from "react-bootstrap";
import styles from "../ComponentClasses.module.css";

interface TabProps {
  eventKey: string;
  children: React.ReactNode;
  title: string;
}

interface TabsWrapper {
  content: TabProps[];
}

const TabWrapper = ({ content }: TabsWrapper) => {
  const [activeKey, setactiveKey] = useState(content[0].eventKey);
  return (
    <SSRProvider>
      <Tab.Container defaultActiveKey={activeKey}>
        <div className="bg-white mb-2 rounded position-relative">
          <Nav
            justify
            className="d-flex gap-1 border-bottom border-2 sticky-top bg-white"
          >
            {content.map((item, index) => (
              <React.Fragment key={index}>
                <NavItem className={styles.navItem}>
                  <NavLink
                    onClick={() => setactiveKey(item.eventKey)}
                    className={`${
                      activeKey === item.eventKey
                        ? styles.navLinkActive
                        : styles.navLink
                    }`}
                    eventKey={item.eventKey}
                  >
                    {item.title}
                  </NavLink>
                </NavItem>
              </React.Fragment>
            ))}
          </Nav>
          <Tab.Content className="pt-3">
            {content.map((item, index) => (
              <React.Fragment key={index}>
                <Tab.Pane eventKey={item.eventKey}>{item.children}</Tab.Pane>
              </React.Fragment>
            ))}
          </Tab.Content>
        </div>
      </Tab.Container>
    </SSRProvider>
  );
};

export default TabWrapper;
