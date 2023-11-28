import { useEffect, useRef } from 'react';

// Custom hook to play sound
const useSound = (url: string): (() => void) => {
  const sound = useRef(new Audio(url));

  const playSound = (): void => {
    sound.current.play();
  };

  useEffect(() => {
    return (): void => {
      sound.current.pause();
      sound.current.currentTime = 0;
    };
  }, []);

  return playSound;
};

export default useSound;
