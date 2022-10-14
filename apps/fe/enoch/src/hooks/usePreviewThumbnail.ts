const usePreviewThumbnail = ({ setBuffer }: any) => {
  const handleFileEvent = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setBuffer(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  return { handleFileEvent };
};

export default usePreviewThumbnail;
