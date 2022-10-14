import React from "react";

const ListItemComponent = ({ setPage }: any) => {
  return (
    <div className="mamage_media_body pr-0">
      <div className="">
        <div className="select_wallet_headings">
          <h2>Select Wallet</h2>
          <button className="disable">Next</button>
        </div>
        <div className="select_wallet_body">
          <p>Select wallet to list the NFTs</p>
          <div className="wallet_seect_sect d-flex">
            <div
              onClick={() => setPage("DECENTRALISED_WALLET")}
              className="wallet_circle"
            >
              <div className="wallet_circle_img wallet_random">
                <img className="img-fluid" src="/images/wallet_random.png" />
              </div>
              <h3>Decentralized Wallet</h3>
            </div>
            <div
              onClick={() => setPage("ENOCH_WALLET")}
              className="wallet_circle"
            >
              <div className="wallet_circle_img wallet_enoch">
                <img className="img-fluid" src="/images/wallet_enoch.png" />
              </div>
              <h3>Enoch Wallet</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemComponent;
