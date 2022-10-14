import React from "react";

export const videos = [
  {
    id: 1,
    rating: "11.4K",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
  },
  {
    id: 2,
    rating: "7.6K",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
  },
  {
    id: 3,
    rating: "15.4K",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
  },
  {
    id: 4,
    rating: "11.4K",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
  },
  {
    id: 5,
    rating: "7.6K",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
  },
  {
    id: 6,
    rating: "15.4K",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
  },
  {
    id: 7,
    rating: "11.4K",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
  },
  {
    id: 8,
    rating: "7.6K",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
  },
  {
    id: 9,
    rating: "15.4K",
    time: "10.30",
    url: "https://www.youtube.com/watch?v=aJOTlE1K90k",
  },
];

interface Props {
  setActiveVideoURL: any;
}

const VideoList = ({ setActiveVideoURL }: Props) => {
  return (
    <div className="col-md-3 avex_ply_ytube_list">
      <div className="bg_left_video_sec">
        <ul>
          {videos.map((el) => (
            <li key={el.id} onClick={() => setActiveVideoURL(el.url)}>
              <div className="ply_list_songs">
                <img
                  src="/images/youtube_singer.png"
                  alt=""
                  className="avex_vdeo_thumnail_list img-fluid"
                />
                <div className="svgs_icons_video_list">
                  <div className="play_icon_rting_ytube">
                    <img src="/images/Play_video1.svg" alt="" />
                    <span className="rating_count_ytube">{el.rating}</span>
                  </div>

                  <div className="time_post">
                    <span className="time_post_avex">{el.time}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VideoList;
