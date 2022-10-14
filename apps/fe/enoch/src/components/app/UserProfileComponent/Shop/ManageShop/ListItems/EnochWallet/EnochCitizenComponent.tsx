import React from "react";

const data = [
  {
    image: "/images/avater1.png",
    name: "Avatar Name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddolore",
  },
  {
    image: "/images/avater2.png",
    name: "Avatar Name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddolore",
  },
  {
    image: "/images/avater3.png",
    name: "Avatar Name",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, seddolore",
  },
];

function EnochCitizenComponent() {
  return (
    <div className="avater_tabcontent">
      <div className="enoch_citizen_content">
        <h2>Select your avatar to list in Shop</h2>
        <div className="row">
          {data.map((item, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="enoch_citizen_card">
                <span>
                  <img src={item.image} alt="img" className="img-fluid" />
                </span>
                <button className="select_avater_btn">Select</button>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EnochCitizenComponent;
