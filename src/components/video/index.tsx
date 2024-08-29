import { useRef, useState } from 'react';

import { Mute, Pause, Play, Unmute } from '@src/components/svg/video-controls';
import { convertToTime } from '@src/lib/helpers/helper';

type Props = {
  src: string;
  loop?: boolean;
  autoPlay?: boolean;
};

export const Video = (props: Props) => {
  const { src, loop = true, autoPlay = true } = props;
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return null;
    if (isMuted) {
      videoRef.current.muted = false;
    } else {
      videoRef.current.muted = true;
    }
    setIsMuted(!isMuted);
  };

  const onDurationChange = () => {
    setDuration(videoRef.current?.duration as number);
  };

  const onTimeUpdate = () => {
    if (isSeeking) return;
    setCurrentTime(videoRef.current?.currentTime as number);
  };

  const handleVolumeChange = (value: number) => {
    if (!videoRef.current) return null;
    videoRef.current.volume = value;
    setVolume(value);
  };

  const handleProgressChange = (value: number) => {
    if (!videoRef.current) return null;
    videoRef.current.currentTime = value;
    setCurrentTime(value);
  };

  const handleOnMouseDown = () => {
    setIsSeeking(true);
    if (isPlaying) {
      videoRef.current?.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const handleOnMouseUp = () => {
    setIsSeeking(false);
    if (!isPlaying) {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const videoControls = () => {
    return (
      <div className="absolute bottom-5 w-full flex justify-between align-center space-x-2 z-10">
        <button
          type="button"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <span className="whitespace-nowrap">
          {`${convertToTime(currentTime)} / ${convertToTime(duration)}`}
        </span>
        <input
          type="range"
          min={0}
          max={duration}
          step={1}
          value={currentTime}
          className="w-full accent-black"
          onChange={(e) => handleProgressChange(+e.target.value)}
          onMouseDown={handleOnMouseDown}
          onMouseUp={handleOnMouseUp}
        />
        <button
          type="button"
          onClick={toggleMute}
        >
          {isMuted ? <Mute /> : <Unmute />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          className="accent-black w-9/12 md:w-32"
          onChange={(e) => handleVolumeChange(+e.target.value)}
        />
      </div>
    );
  };

  return (
    <div className="absolute flex justify-center align-center h-full">
      <video
        ref={videoRef}
        width="1280"
        height="720"
        loop={loop}
        controls={false}
        autoPlay={autoPlay}
        controlsList="nodownload"
        onDurationChange={onDurationChange}
        onTimeUpdate={onTimeUpdate}
      >
        <source
          src={src}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 flex items-center justify-center align-center">
        <span
          aria-hidden="true"
          className="h-5/6 w-10/12 z-[9]"
          onClick={togglePlay}
        />
      </div>
      {videoControls()}
    </div>
  );
};
