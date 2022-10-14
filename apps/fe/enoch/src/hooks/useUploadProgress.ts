import { useEffect, useState, useCallback } from "react";

enum UploadStatus {
  PENDING = "In Progress",
  COMPLETED = "Done",
}
const useUploadProgress = () => {
  const [percentage, setPercentage] = useState<number>(0);
  const [status, setStatus] = useState<string>(UploadStatus.PENDING);
  const [timerId, setTimerId] = useState<any>();
  const startTimer = useCallback(() => {
    if (timerId) {
      clearInterval(timerId);
    }

    setPercentage(0);
    setStatus(UploadStatus.PENDING);

    const timerIds = setInterval(() => {
      setPercentage((percentage) => {
        if (percentage === 100) {
          clearInterval(timerIds);
          setStatus(UploadStatus.COMPLETED);
          return percentage;
        } else {
          return percentage + 10;
        }
      });
    }, 1000);

    setTimerId(timerIds);
  }, [timerId]);

  return {
    percentage,
    setPercentage,
    startTimer,
    status,
  };
};

export default useUploadProgress;
