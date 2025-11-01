import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Minimize2 } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';

const MusicControlPanel = ({ 
  isPlaying, 
  isMuted, 
  volume, 
  currentTime, 
  duration,
  onTogglePlay, 
  onToggleMute, 
  onVolumeChange, 
  onSeek 
}) => {
  const [isMinimized, setIsMinimized] = useState(true);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white/85 backdrop-blur-md rounded-lg shadow-lg border border-white/20 z-50 transition-all duration-200">
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-700">龙卷风 - 周杰伦</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-0.5 hover:bg-gray-100 rounded transition-colors"
            >
              <Minimize2 className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={onTogglePlay}
                className="p-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              
              <button
                onClick={onToggleMute}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isMuted ? <VolumeX className="w-3 h-3 text-gray-600" /> : <Volume2 className="w-3 h-3 text-gray-600" />}
              </button>
              
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={(e) => onVolumeChange(Number(e.target.value))}
                className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => onSeek(Number(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <AudioVisualizer isPlaying={isPlaying} />
          </>
        )}
      </div>
    </div>
  );
};

export default MusicControlPanel;
