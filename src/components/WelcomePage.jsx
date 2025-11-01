import React from 'react';
import { Music, StickyNote, Smartphone, Heart } from 'lucide-react';

const WelcomePage = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/60 shadow-lg text-center">
        {/* 装饰性元素 */}
        <div className="absolute top-4 right-4 w-8 h-8 bg-pink-200 rounded-full opacity-60"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 bg-blue-200 rounded-full opacity-60"></div>
        <div className="absolute top-8 left-8 w-4 h-4 bg-green-200 rounded-full opacity-60"></div>
        
        {/* 标题区域 */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full mb-4">
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">便签心情墙</h1>
          <p className="text-slate-600 text-base">记录每一刻的美好心情</p>
        </div>
        
        {/* 功能特性 */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-start gap-3 text-slate-700 p-3 bg-white/50 rounded-lg border border-white/80">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Music className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-sm">背景音乐陪伴</span>
          </div>
          <div className="flex items-center justify-start gap-3 text-slate-700 p-3 bg-white/50 rounded-lg border border-white/80">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <StickyNote className="w-4 h-4 text-green-500" />
            </div>
            <span className="text-sm">动态便签展示</span>
          </div>
          <div className="flex items-center justify-start gap-3 text-slate-700 p-3 bg-white/50 rounded-lg border border-white/80">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-purple-500" />
            </div>
            <span className="text-sm">全设备适配</span>
          </div>
        </div>
        
        {/* 进入按钮 */}
        <button
          onClick={onEnter}
          className="w-full bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95"
        >
          进入便签墙
        </button>
        
        {/* 底部装饰文字 */}
        <p className="text-xs text-slate-400 mt-4">让心情如诗般绽放</p>
      </div>
    </div>
  );
};

export default WelcomePage;
