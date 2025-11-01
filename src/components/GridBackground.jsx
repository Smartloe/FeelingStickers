import React from 'react';

const GridBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div 
        className="w-full h-full opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 150, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 150, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />
    </div>
  );
};

export default GridBackground;
