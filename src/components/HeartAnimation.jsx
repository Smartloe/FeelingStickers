import React, { useEffect, useState } from 'react';

const HeartAnimation = ({ position, onComplete }) => {
  const [hearts, setHearts] = useState([]);

  // 七彩颜色数组
  const rainbowColors = [
    "#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#9AECDB", 
    "#f1c40f", "#e67e22", "#e74c3c", "#9980FA", "#c0392b", 
    "#d35400", "#f39c12"
  ];

  useEffect(() => {
    // 创建多个爱心
    const newHearts = [];
    for (let i = 0; i < 15; i++) {
      const colorIndex = Math.floor(Math.random() * rainbowColors.length);
      const offsetX = (Math.random() - 0.5) * 100;
      const offsetY = (Math.random() - 0.5) * 100;
      
      newHearts.push({
        id: i,
        x: position.x + offsetX,
        y: position.y + offsetY,
        color: rainbowColors[colorIndex],
        opacity: 1,
        scale: 0.8 + Math.random() * 0.4,
        life: 0,
      });
    }
    setHearts(newHearts);

    // 动画持续时间
    const timer = setTimeout(() => {
      onComplete();
    }, 2100); // 30帧 * 70ms

    return () => clearTimeout(timer);
  }, [position, onComplete]);

  useEffect(() => {
    if (hearts.length === 0) return;

    const interval = setInterval(() => {
      setHearts(prevHearts => 
        prevHearts.map(heart => {
          const newLife = heart.life + 1;
          let newOpacity = 1;
          
          // 根据生命周期调整透明度
          if (newLife >= 20) {
            newOpacity = 0.3;
          } else if (newLife >= 10) {
            newOpacity = 0.6;
          }
          
          return {
            ...heart,
            life: newLife,
            opacity: newOpacity,
            y: heart.y - 5, // 向上移动
          };
        }).filter(heart => heart.life < 30) // 30帧后消失
      );
    }, 70); // 70ms间隔，与参考代码一致

    return () => clearInterval(interval);
  }, [hearts]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute"
          style={{
            left: heart.x,
            top: heart.y,
            opacity: heart.opacity,
            color: heart.color,
            transform: `scale(${heart.scale})`,
            transition: 'all 0.07s linear',
          }}
        >
          <svg 
            className="icon" 
            viewBox="0 0 1169 1024" 
            width="36" 
            height="32"
            fill="currentColor"
          >
            <path d="M1045.333 117.333C919.467-6.4 716.8-10.667 584.533 106.667 452.267-10.667 249.6-6.4 123.733 117.333c-128 128-130.133 337.067-2.133 467.2l4.267 4.267 384 384c40.533 40.533 106.666 42.667 149.333 2.133l2.133-2.133 384-384c128-128 130.134-337.067 4.267-465.067-2.133-4.266-2.133-4.266-4.267-6.4z" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default HeartAnimation;
