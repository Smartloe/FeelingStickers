import { useState, useEffect } from 'react';

const COLORS = [
  'bg-gradient-to-br from-pink-200 to-pink-300',
  'bg-gradient-to-br from-blue-200 to-blue-300',
  'bg-gradient-to-br from-green-200 to-green-300',
  'bg-gradient-to-br from-yellow-200 to-yellow-300',
  'bg-gradient-to-br from-purple-200 to-purple-300',
  'bg-gradient-to-br from-orange-200 to-orange-300',
  'bg-gradient-to-br from-indigo-200 to-indigo-300',
  'bg-gradient-to-br from-teal-200 to-teal-300'
];

const NOTES = [
  '保持好心情', '多喝水哦', '今天辛苦啦', '早点休息', '记得吃水果',
  '加油，你可以的', '祝你顺利', '保持微笑呀', '愿所有烦恼都消失',
  '期待下一次见面', '梦想总会实现', '天气冷了，多穿衣服',
  '记得给自己放松', '每天都要元气满满', '今天也要好好爱自己',
  '记得按时吃饭', '多运动哦', '保持好睡眠', '记得微笑', '一切都会好的'
];

export const useStickyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [maxNotes, setMaxNotes] = useState(30);
  const [spawnInterval, setSpawnInterval] = useState(1000); // 从2000ms改为1000ms，加快生成速度

  useEffect(() => {
    // 检测是否为移动设备
    const isMobile = window.innerWidth < 768;
    setMaxNotes(isMobile ? 20 : 30);
    setSpawnInterval(isMobile ? 1500 : 1000); // 移动设备也相应加快
    
    // 初始生成5个便签
    const initialNotes = [];
    for (let i = 0; i < 5; i++) {
      initialNotes.push(createNote());
    }
    setNotes(initialNotes);

    // 设置定时生成便签
    const interval = setInterval(() => {
      addNote();
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [spawnInterval]);

  const createNote = () => {
    const isMobile = window.innerWidth < 768;
    const cardWidth = isMobile ? 160 : 180;
    const cardHeight = isMobile ? 80 : 100;
    const maxX = window.innerWidth - cardWidth - 40;
    const maxY = window.innerHeight - cardHeight - 100;
    
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * maxX + 20,
      y: Math.random() * maxY + 20,
      rotation: (Math.random() - 0.5) * 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      content: NOTES[Math.floor(Math.random() * NOTES.length)],
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      createdAt: Date.now()
    };
  };

  const addNote = () => {
    setNotes(prev => {
      // 如果达到最大数量，移除最早的便签
      if (prev.length >= maxNotes) {
        const sortedNotes = [...prev].sort((a, b) => a.createdAt - b.createdAt);
        const oldestNote = sortedNotes[0];
        const filteredNotes = prev.filter(note => note.id !== oldestNote.id);
        return [...filteredNotes, createNote()];
      }
      return [...prev, createNote()];
    });
  };

  const removeNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const updateNote = (id, updates) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const bringToFront = (id) => {
    setNotes(prev => prev.map(note => ({
      ...note,
      zIndex: note.id === id ? 1000 : note.zIndex
    })));
  };

  return {
    notes,
    addNote,
    removeNote,
    updateNote,
    bringToFront,
    maxNotes
  };
};
