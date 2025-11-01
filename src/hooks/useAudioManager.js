import { useState, useEffect, useRef } from 'react';

export const useAudioManager = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio('https://raw.githubusercontent.com/Smartloe/My_Audio/main/%E9%BE%99%E5%8D%B7%E9%A3%8E.flac');
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    const audio = audioRef.current;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    
    // 监听用户交互
    const handleUserInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener('click', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.pause();
      document.removeEventListener('click', handleUserInteraction);
    };
  }, []);

  const togglePlay = async () => {
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (userInteracted) {
          await audioRef.current.play();
          setIsPlaying(true);
        } else {
          // 如果用户还没有交互，等待交互后再播放
          const playOnInteraction = async () => {
            document.removeEventListener('click', playOnInteraction);
            setUserInteracted(true);
            try {
              await audioRef.current.play();
              setIsPlaying(true);
            } catch (error) {
              console.log('播放失败:', error);
            }
          };
          document.addEventListener('click', playOnInteraction);
        }
      }
    } catch (error) {
      console.log('播放失败:', error);
    }
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (newVolume) => {
    const volumeValue = newVolume / 100;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  const handleSeek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return {
    isPlaying,
    isMuted,
    volume,
    currentTime,
    duration,
    togglePlay,
    toggleMute,
    handleVolumeChange,
    handleSeek,
    userInteracted
  };
};
