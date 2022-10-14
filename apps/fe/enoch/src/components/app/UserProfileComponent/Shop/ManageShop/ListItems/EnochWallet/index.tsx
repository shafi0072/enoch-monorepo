import React from "react";
import EnochCitizenComponent from "./EnochCitizenComponent";
import ListNFT from "./ListNFT";

const Pages: any = {
  ENOCH_CITIZEN: EnochCitizenComponent,
  ENOCHLAND_PLOT: () => <div>Enoch land and plot</div>,
  ENOCH_GAME_ASSESTS: () => <div>Enoch game assets</div>,
  LIST_NFT: ListNFT,
};

const EnochWallet = () => {
  const [page, setPage] = React.useState("ENOCH_CITIZEN");

  const PageComponent = Pages[page];
  return (
    <div>
      <div className="">
        {page !== "LIST_NFT" ? (
          <div className="select_wallet_headings">
            <h2>
              Enoch wallet <span>0x0d5f0...f1270</span>
            </h2>
            <button
              onClick={() => setPage("LIST_NFT")}
              className="select_avater_nxt_btn"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="select_wallet_headings">
            <h2>List NFT to sale</h2>
            <div className="d-flex gap-2">
              <button
                onClick={() => setPage("ENOCH_CITIZEN")}
                className="skp_avex"
              >
                Back
              </button>
              <button
                onClick={() => setPage("LIST_NFT")}
                className="select_avater_nxt_btn"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {page !== "LIST_NFT" && (
          <div className="select_wallet_body">
            <div className="shop_avater_tab">
              <button
                onClick={() => setPage("ENOCH_CITIZEN")}
                className="avater_tablinks active"
                id="defaultActive"
              >
                Enoch's citizen{" "}
              </button>
              <button
                onClick={() => setPage("ENOCHLAND_PLOT")}
                className="avater_tablinks"
              >
                Enochland Plot{" "}
              </button>
              <button
                onClick={() => setPage("ENOCH_GAME_ASSESTS")}
                className="avater_tablinks"
              >
                Enoch Game Assets
              </button>
            </div>
          </div>
        )}
        <PageComponent />
      </div>
    </div>
  );
};

export default EnochWallet;
