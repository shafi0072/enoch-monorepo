import React, { useCallback } from "react";
import { useEffect, useRef, useState } from "react";

import { Annotorious } from "@recogito/annotorious";
import { base64ToBlob } from "base64-blob";
import "@recogito/annotorious/dist/annotorious.min.css";

interface tagFacePropsType {
  setTagCaption: any,
  imagePath: any,
  annotations: any,
  setAnnotations:any
}

function TagFaceWrapper({ imagePath, annotations, setAnnotations, setTagCaption }: tagFacePropsType) {
  const imgEl = useRef<any>(null);
  let annotorious: any = null;

  useEffect(() => {
    if (imgEl.current) {
      annotorious = new Annotorious({ image: imgEl.current });
      if (annotations) {
        annotations.forEach((annotation: any) => {
          annotorious.addAnnotation(annotation, true);
          
        });
      }
      onListenEvents();
      
    }
    return () => annotorious.destroy();
  }, [annotorious, annotations]);

 
  const onListenEvents = useCallback(() => {
    // Attach event handlers here
    
    annotorious.on("createAnnotation", (annotation: any) => {
      setAnnotations([...annotations, annotation]);
      
    });
  }, [annotorious, annotations, setAnnotations, setTagCaption]);
  const handleTagCaption = () => {
    setTagCaption(false)
  }
  return (
    <div onClick={handleTagCaption}>
      {imagePath && (
        <img
          ref={imgEl}
          src={imagePath}
          className="tagged_image"
         
          alt="imgEl"
         
        />
      )}
    </div>
  );
}

export default React.memo(TagFaceWrapper);
