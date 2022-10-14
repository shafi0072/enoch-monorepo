import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { postTypeNavigation } from "../../../../../constants";

export const PostTypeNavigation = () => {
  const router = useRouter();
  return (
    <ul>
      {postTypeNavigation.map((nav) => {
        return (
          <li className="posingtablinks photo-title" key={nav.url}>
            <Link href={`${nav.url}`}>
              <a>
                {router.asPath === `${nav.url}` ? (
                  <img
                    src={nav.hoverImage}
                    className="img-fluid posting-link-img without-hover"
                    alt="images"
                  />
                ) : (
                  <img
                    src={nav.image}
                    className="img-fluid posting-link-img without-hover"
                    alt="images"
                  />
                )}
                <img
                  src={nav.hoverImage}
                  className="img-fluid posting-link-img-hov"
                  alt="images"
                />
                <span className="posting-hovr">{nav.title}</span>
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const PostWrapperFooter = ({ handleSubmit, postReady, isLoading }: any) => {
  return (
    <div className="posting-steps-content-body">
      <div className="posting-steps-bottm-sect">
        <div className="posting-steps-bottm-links">
          <PostTypeNavigation />
        </div>
        <div className="posting-steps-btn-links">
          <span className="mr-2">
            <Link href="/">
              <a className="btn posting-steps-back-btn">Back</a>
            </Link>
          </span>

          {postReady ? (
            <button onClick={handleSubmit} className=" post-active-btn">
              {isLoading ? "Posting..." : "Post"}
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="posting-steps-done-btn post-btn "
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostWrapperFooter;
