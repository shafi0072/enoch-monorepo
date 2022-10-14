import React from "react";
import Tab from "../../../../core/components/Tab";
import ImageSection from "./ImageSection";
import LinkSection from "./LinkSection";
import SectionWrapper from "./SectionWrapper";
import SlideSection from "./SlideSection";
import SnippetSection from "./SnippetSection";
import VideoSection from "./VideoSection";

interface Props {
  closeActiveComponent: () => void;
  activeComponent: string;
}

const tabs = {
  IMAGE: "IMAGE",
  VIDEO: "VIDEO",
  SLIDES: "SLIDES",
  LINKS: "LINKS",
  SNIPPET: "SNIPPET",
};
const ContentContainer = ({ closeActiveComponent, activeComponent }: Props) => {
  return (
    <div className="add-attachment-tab-sect d-block">
      <Tab {...{ activeComponent, tabName: tabs.IMAGE }}>
        <SectionWrapper closeActiveComponent={closeActiveComponent}>
          <ImageSection />
        </SectionWrapper>
      </Tab>

      <Tab {...{ activeComponent, tabName: tabs.VIDEO }}>
        <SectionWrapper closeActiveComponent={closeActiveComponent}>
          <VideoSection />
        </SectionWrapper>
      </Tab>

      <Tab {...{ activeComponent, tabName: tabs.SLIDES }}>
        <SectionWrapper closeActiveComponent={closeActiveComponent}>
          <SlideSection />
        </SectionWrapper>
      </Tab>

      <Tab {...{ activeComponent, tabName: tabs.LINKS }}>
        <SectionWrapper closeActiveComponent={closeActiveComponent}>
          <LinkSection />
        </SectionWrapper>
      </Tab>

      <Tab {...{ activeComponent, tabName: tabs.SNIPPET }}>
        <SectionWrapper closeActiveComponent={closeActiveComponent}>
          <SnippetSection />
        </SectionWrapper>
      </Tab>
    </div>
  );
};

export default ContentContainer;
