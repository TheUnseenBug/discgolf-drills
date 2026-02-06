import { useMemo } from "react";

export function useMinutesSeconds(totalSeconds?: number) {
  return useMemo(() => {
    if (totalSeconds == null || totalSeconds < 0) {
      return {
        minutes: 0,
        seconds: 0,
        formatted: "0:00",
      };
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return {
      minutes,
      seconds,
      formatted: `${minutes}:${seconds.toString().padStart(2, "0")}`,
    };
  }, [totalSeconds]);
}
