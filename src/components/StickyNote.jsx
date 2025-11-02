import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square } from 'lucide-react';

const StickyNote = ({ 
  note, 
  onUpdate, 
  onRemove, 
  onBringToFront 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const noteRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        onUpdate(note.id, { x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, note.id, onUpdate]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.note-controls')) return;
    
    setIsDragging(true);
    const rect = noteRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    onBringToFront(note.id);
  };

  const handleDoubleClick = () => {
    onUpdate(note.id, { isMaximized: !note.isMaximized });
  };

  const handleClose = () => {
    onRemove(note.id);
  };

  const handleMinimize = () => {
    onUpdate(note.id, { isMinimized: !note.isMinimized });
  };

  const handleMaximize = () => {
    onUpdate(note.id, { isMaximized: !note.isMaximized });
  };

  if (note.isMinimized || note.isHidden) {
    return null;
  }

  return (
    <div
      ref={noteRef}
      className={`absolute ${note.color} rounded-lg shadow-lg cursor-move transition-all duration-500 ease-in-out ${
        note.isMaximized ? 'fixed inset-4 z-50' : ''
      }`}
      style={{
        left: note.x,
        top: note.y,
        transform: `rotate(${note.rotation}deg)`,
        zIndex: note.zIndex,
        width: note.isMaximized ? 'auto' : '180px',
        height: note.isMaximized ? 'auto' : '100px',
        opacity: note.opacity !== undefined ? note.opacity : 1
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div className="note-controls flex items-center justify-between p-1.5 bg-black/10 rounded-t-lg">
        <div className="flex items-center gap-1">
          <button
            onClick={handleClose}
            className="w-2.5 h-2.5 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
          />
          <button
            onClick={handleMinimize}
            className="w-2.5 h-2.5 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
          />
          <button
            onClick={handleMaximize}
            className="w-2.5 h-2.5 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClose}
            className="p-0.5 hover:bg-black/10 rounded transition-colors"
          >
            <X className="w-3 h-3 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-2 h-full overflow-auto">
        <p className="text-gray-800 text-xs leading-relaxed">
          {note.content}
        </p>
      </div>
    </div>
  );
};

export default StickyNote;
