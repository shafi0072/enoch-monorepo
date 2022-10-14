import Link from "next/link";
import React from "react";

const links = [
  {
    id: 1,
    title: "Photo",
    icon: "/images/post-Image.png",
    url: "/create-post/photo",
  },
  {
    id: 2,
    title: "Video",
    icon: "/images/post-Video.png",
    url: "/create-post/video",
  },
  {
    id: 3,
    title: "Event",
    icon: "/images/post-Event.png",
    url: "/create-post/event",
  },
  {
    id: 4,
    title: "Article",
    icon: "/images/post-Article.png",
    url: "/create-post/article",
  },
];

const WritePostUI = () => {
  return (
    <div className="dApp-status-block mb-16">
      <div className="home-post-share-block">
        <div className="home-post-share-lft">
          <img src="/images/comm-usr-img6.png" alt="DP" className="img-fluid" />
        </div>
        <div className="home-post-share-right">
          <Link href="/create-post">
            <a className="home-post-input">Post </a>
          </Link>
          <ul>
            {links.map((item) => (
              <li key={item.id}>
                <Link href={item.url}>
                  <a className="text-clr">
                    <span>
                      <img src={item.icon} className="img-fluid" alt="Photo" />
                    </span>
                    {item.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WritePostUI;
