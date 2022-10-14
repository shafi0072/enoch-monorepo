import React from "react";
import TabWrapper from "../../../core/lib/bootstrap/Tabs";
import InterestCard from "./InterestCard";

const creators = [
  {
    title: "@Hulk",
    description: "(310) 340-7892 | EQUAL IN THE DARKNESS OUT NOW",
    following: true,
    image: "/images/userAvtar/user-Av1.png",
  },
  {
    title: "@Draco",
    description:
      "co-founder @manifoldxyz || Punk #6046 || Professional NFT Degen || smART contract artist",
    following: false,
    image: "/images/userAvtar/user-Av2.png",
  },
  {
    title: "@Cooger",
    description: "(310) 340-7892 | EQUAL IN THE DARKNESS OUT NOW",
    following: true,
    image: "/images/userAvtar/user-Av3.png",
  },
  {
    title: "@Hulk",
    description:
      "Freshly minted NFT news, curation and analysis. On a mission to empower the creators of culture. http://nftnow.com.",
    following: true,
    image: "/images/userAvtar/user-Av3.png",
  },
];

const Interest = () => {
  return (
    <TabWrapper
      content={[
        {
          eventKey: "influencers",
          title: "Influencers",
          children: (
            <div>
              {creators.map((item, index) => (
                <InterestCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  following={item.following}
                  image={item.image}
                />
              ))}
            </div>
          ),
        },
        {
          eventKey: "creators",
          title: "Creators",
          children: (
            <div>
              {" "}
              {creators.map((item, index) => (
                <InterestCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  following={item.following}
                  image={item.image}
                />
              ))}
            </div>
          ),
        },
        {
          eventKey: "companies",
          title: "Companies",
          children: (
            <div>
              {" "}
              {creators.map((item, index) => (
                <InterestCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  following={item.following}
                  image={item.image}
                />
              ))}
            </div>
          ),
        },
        {
          eventKey: "communities",
          title: "Communities",
          children: (
            <div>
              {" "}
              {creators.map((item, index) => (
                <InterestCard
                  key={index}
                  title={item.title}
                  description={item.description}
                  following={item.following}
                  image={item.image}
                />
              ))}
            </div>
          ),
        },
      ]}
    />
  );
};

export default Interest;
