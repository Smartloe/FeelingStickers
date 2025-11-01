import React, { useRef, useEffect } from 'react';

const AudioVisualizer = ({ isPlaying }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isPlaying) {
        // 绘制动态波形
        const barCount = 20;
        const barWidth = canvas.width / barCount;
        
        for (let i = 0; i < barCount; i++) {
          const barHeight = Math.random() * canvas.height * 0.8;
          const x = i * barWidth;
          const y = canvas.height - barHeight;
          
          // 渐变颜色
          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
          gradient.addColorStop(0, `rgba(100, 150, 255, ${0.8 + Math.random() * 0.2})`);
          gradient.addColorStop(1, `rgba(100, 150, 255, ${0.3 + Math.random() * 0.2})`);
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, barWidth - 2, barHeight);
        }
      } else {
        // 绘制静态波形
        const barCount = 20;
        const barWidth = canvas.width / barCount;
        
        for (let i = 0; i < barCount; i++) {
          const barHeight = canvas.height * 0.1;
          const x = i * barWidth;
          const y = canvas.height - barHeight;
          
          ctx.fillStyle = 'rgba(100, 150, 255, 0.3)';
          ctx.fillRect(x, y, barWidth - 2, barHeight);
        }
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={40}
      className="w-full h-10 rounded-lg"
    />
  );
};

export default AudioVisualizer;
