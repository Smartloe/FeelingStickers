import React, { useEffect, useState } from 'react';
import { useAudioManager } from '../hooks/useAudioManager';
import { useStickyNotes } from '../hooks/useStickyNotes';
import MusicControlPanel from '../components/MusicControlPanel';
import StickyNote from '../components/StickyNote';
import GridBackground from '../components/GridBackground';

const Index = () => {
  const {
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
  } = useAudioManager();

  const {
    notes,
    addNote,
    removeNote,
    updateNote,
    bringToFront,
    maxNotes
  } = useStickyNotes();

  const [animationPhase, setAnimationPhase] = useState('initial'); // initial, arranging, holding, dispersing, reappearing

  // 爱心形状排列函数
  const arrangeInHeartShape = () => {
    if (notes.length === 0) return;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const heartSize = Math.min(window.innerWidth, window.innerHeight) * 0.4;
    
    // 爱心形状的数学公式
    const heartPoints = [];
    for (let t = 0; t <= 2 * Math.PI; t += 0.1) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
      heartPoints.push({ x, y });
    }

    // 为每个便签分配爱心上的位置
    notes.forEach((note, index) => {
      const pointIndex = Math.floor((index / notes.length) * heartPoints.length);
      const point = heartPoints[pointIndex];
      
      const x = centerX + point.x * (heartSize / 16);
      const y = centerY - point.y * (heartSize / 16);
      
      updateNote(note.id, { 
        x: x - 90, // 减去便签宽度的一半
        y: y - 50  // 减去便签高度的一半
      });
    });
  };

  // 散开便签到屏幕边缘
  const disperseNotes = () => {
    notes.forEach((note) => {
      const randomX = Math.random() * (window.innerWidth - 180);
      const randomY = Math.random() * (window.innerHeight - 100);
      updateNote(note.id, { 
        x: randomX,
        y: randomY,
        opacity: 0
      });
    });
  };

  // 重新浮现便签
  const reappearNotes = () => {
    notes.forEach((note) => {
      const randomX = Math.random() * (window.innerWidth - 180);
      const randomY = Math.random() * (window.innerHeight - 100);
      updateNote(note.id, { 
        x: randomX,
        y: randomY,
        opacity: 1
      });
    });
  };

  // 动画循环控制
  useEffect(() => {
    if (notes.length === 0) return;

    let timer;

    const startAnimationCycle = () => {
      setAnimationPhase('arranging');
      arrangeInHeartShape();
      
      timer = setTimeout(() => {
        setAnimationPhase('holding');
        
        timer = setTimeout(() => {
          setAnimationPhase('dispersing');
          disperseNotes();
          
          timer = setTimeout(() => {
            setAnimationPhase('reappearing');
            reappearNotes();
            
            timer = setTimeout(() => {
              // 重新开始循环
              startAnimationCycle();
            }, 1000); // 重现动画时间
          }, 1000); // 散开动画时间
        }, 3000); // 保持3秒
      }, 1000); // 排列动画时间
    };

    // 开始动画循环
    startAnimationCycle();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [notes.length]);

  // 初始创建便签
  useEffect(() => {
    if (notes.length === 0) {
      // 创建初始便签
      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          addNote();
        }, i * 100); // 间隔创建，形成动画效果
      }
    }
  }, []);

  useEffect(() => {
    // 进入主页面后自动开始播放音乐
    if (userInteracted && !isPlaying) {
      togglePlay();
    }
  }, [userInteracted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <GridBackground />
      
      {/* 便签容器 - 占据整个网页 */}
      <div className="relative z-10 w-full h-full min-h-screen">
        {notes.map((note) => (
          <StickyNote
            key={note.id}
            note={note}
            onUpdate={updateNote}
            onRemove={removeNote}
            onBringToFront={bringToFront}
          />
        ))}
      </div>

      {/* 音乐控制面板 */}
      <MusicControlPanel
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        currentTime={currentTime}
        duration={duration}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        onVolumeChange={handleVolumeChange}
        onSeek={handleSeek}
      />
    </div>
  );
};

export default Index;
