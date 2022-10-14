import React from "react";
import ActionCard from "./ActionCard";
import Item from "../Item";
import EmptySubscription from "../EmptySubscription";

const actions = [
  {
    id: 1,
    title: "Block",
  },
  {
    id: 2,
    title: "Report",
  },
  {
    id: 3,
    title: "Cancel and refund",
  },
  {
    id: 4,
    title: "Delete",
  },
];
const Subscribers = () => {
  const arr = Array(0).fill(null);

  return (
    <>
      {arr.length === 0 ? (
        <EmptySubscription message="No subscriber yet" />
      ) : (
        <div id="mediaSubscriber" className="tabcontent_subscription">
          <div className="search-flow-row">
            <div className=" terminal-term-Checkbox">
              <input type="checkbox" name="" id="" />
            </div>
            <div className="flexing-proper-main">
              <div className="search-user">
                <input type="text" name="" id="" placeholder="Search user" />
              </div>
              <div className="dating-box-wrap ">
                <div className="clander-text-wrap">
                  <img src="images/cal-dar.png" alt="" />
                  <p className="mb-0">Select Date</p>
                </div>
                <div className="toggle-drop">
                  <img src="images/row-down.png" alt="" />
                </div>
              </div>
              <div className="chose-drops-sec ">
                <div className="remedy " data-toggle="dropdown">
                  <p>Status</p>
                </div>
                <div className="Mint-for-carbon"></div>
              </div>
            </div>
          </div>

          <div className="table-for-subs">
            <table className="subscriber-user-tabel">
              <tbody>
                <tr className="user-table-head-row">
                  <th></th>
                  <th>User</th>
                  <th>Date Subscribed</th>
                  <th>Total Views</th>
                  <th>Status</th>
                  <th></th>
                </tr>
                {arr.map((item, i) => (
                  <Item key={i} {...{ actions }} />
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-buttons-numbers">
            <div className="one-right-bar">
              <img src="images/left-1.png" alt="" />
              <img src="images/left-1.png" alt="" />
            </div>
            <div className="one-right-bar">
              <img src="images/left-1.png" alt="" />
            </div>
            <div className="yellow-btn">1</div>
            <div className="numbers-game">
              <p>2</p>
              <p>3</p>
              <p>...</p>
              <p>5</p>
            </div>
            <div className="one-right-bar left-outlet-mark">
              <img src="images/Arrow-Right-dart.png" alt="" />
            </div>
            <div className=" one-right-bar left-outlet-mark">
              <img src="images/Arrow-Right-dart.png" alt="" />
              <img src="images/Arrow-Right-dart.png" alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Subscribers;
