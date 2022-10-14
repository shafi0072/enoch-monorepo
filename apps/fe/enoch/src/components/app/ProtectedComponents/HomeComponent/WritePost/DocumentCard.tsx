import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { formatBytes } from "../../../../../utils";

interface Props {
  data?: any;
}

const DocumentCard = ({ data }: Props) => {
  const [size, setSize] = useState(
    data?.size || data?.sizeBytes || data?.bytes
  );
  const router = useRouter();

  const discardDocument = useCallback(() => {
    router.replace("/create-post");
  }, [router]);

  return (
    <>
      <div className="pdf-uploaded-box mt-2">
        <div className="pdf-uploaded-img">
          <img
            src="/images/uploaded-pdf-img.svg"
            alt="img"
            className="img-fluid"
          />
        </div>
        <div className="pdf-uploaded-text">
          <h4>{data?.name}</h4>
          <h5>{formatBytes(size)}</h5>
        </div>
        <div className="pdf-uploaded-box-cancel" onClick={discardDocument}>
          <img
            src="/images/uploaded-pdf-cancel-icon.svg"
            alt="icon"
            className="img-fluid"
          />
        </div>
      </div>
    </>
  );
};
export default DocumentCard;
