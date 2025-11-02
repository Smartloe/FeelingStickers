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

  const [animationPhase, setAnimationPhase] = useState('initial'); // initial, first-heart, clear, popup, heart, clear...

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

  // 清屏：隐藏所有卡片
  const clearScreen = () => {
    notes.forEach((note) => {
      updateNote(note.id, { 
        isHidden: true
      });
    });
  };

  // 逐一弹出卡片
  const popupNotesOneByOne = (onComplete) => {
    let poppedCount = 0;
    const totalNotes = notes.length;
    
    notes.forEach((note, index) => {
      const delay = Math.random() * 18000; // 在18秒内随机弹出
      setTimeout(() => {
        const randomX = Math.random() * (window.innerWidth - 180);
        const randomY = Math.random() * (window.innerHeight - 100);
        updateNote(note.id, { 
          isHidden: false,
          x: randomX,
          y: randomY,
          rotation: (Math.random() - 0.5) * 8
        });
        
        poppedCount++;
        // 当所有卡片都弹出后调用完成回调
        if (poppedCount === totalNotes && onComplete) {
          onComplete();
        }
      }, delay);
    });
  };

  // 动画循环控制
  useEffect(() => {
    if (notes.length === 0) return;

    let timer;

    const startFirstHeartAnimation = () => {
      setAnimationPhase('first-heart');
      
      // 立即显示所有卡片并排列成爱心
      notes.forEach((note) => {
        updateNote(note.id, { 
          isHidden: false
        });
      });
      
      // 快速排列成爱心
      setTimeout(() => {
        arrangeInHeartShape();
        
        // 保持爱心形状3秒
        timer = setTimeout(() => {
          startLoopAnimation();
        }, 3000);
      }, 100);
    };

    const startLoopAnimation = () => {
      // 清屏阶段
      setAnimationPhase('clear');
      clearScreen();
      
      // 等待1秒后开始弹出卡片
      timer = setTimeout(() => {
        setAnimationPhase('popup');
        popupNotesOneByOne(() => {
          // 所有卡片都弹出后立即排列成爱心
          setAnimationPhase('heart');
          arrangeInHeartShape();
          
          // 保持爱心形状3秒
          timer = setTimeout(() => {
            // 重新开始循环
            startLoopAnimation();
          }, 3000);
        });
      }, 1000); // 清屏后等待1秒
    };

    // 开始首次动画
    startFirstHeartAnimation();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [notes.length]);

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
