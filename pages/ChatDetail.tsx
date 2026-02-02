
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MOCK_PETS } from '../constants';

const ChatDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pet = MOCK_PETS[0]; // Simple logic for demo: matching "旺财" from screenshot

  return (
    <div className="h-screen bg-background-light dark:bg-background-dark flex flex-col animate-fade-in relative">
      {/* Header */}
      <header className="bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-50 dark:border-gray-800">
        <div className="flex items-center p-2 h-16">
          <button 
            onClick={() => navigate(-1)} 
            className="size-12 flex items-center justify-center text-[#0d1b12] dark:text-white active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined text-[28px]">chevron_left</span>
          </button>
          <div className="flex-1 flex flex-col items-center">
            <h2 className="text-[17px] font-bold text-[#0d1b12] dark:text-white">聊天详情</h2>
            <div className="flex items-center gap-1">
              <div className="size-1.5 bg-primary rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-primary">在线</span>
            </div>
          </div>
          <button className="size-12 flex items-center justify-center text-[#0d1b12] dark:text-white">
            <span className="material-symbols-outlined text-[24px]">more_horiz</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6 pb-24 hide-scrollbar">
        {/* Context Card - Refined to match screenshot */}
        <div className="bg-[#f0f4f1] dark:bg-surface-dark/50 rounded-3xl p-4 flex gap-4 border border-white dark:border-gray-800 shadow-sm">
          <div className="flex-1 flex flex-col justify-between py-1">
            <div>
              <p className="text-[11px] font-bold text-primary-dark mb-1">关于{pet.name}的咨询</p>
              <h3 className="text-xl font-bold text-[#0d1b12] dark:text-white mb-0.5">{pet.name}</h3>
              <p className="text-[11px] text-gray-500 font-medium">{pet.age} | {pet.breed} | {pet.gender}</p>
            </div>
            <button className="bg-primary/20 hover:bg-primary/30 text-primary-dark px-4 py-1.5 rounded-full text-[11px] font-bold w-fit mt-4 transition-colors">
              查看详情
            </button>
          </div>
          <div className="size-24 rounded-2xl overflow-hidden shadow-sm shrink-0 bg-white p-1">
             <img src={pet.image} alt={pet.name} className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>

        <div className="flex justify-center my-8">
          <span className="px-4 py-1 bg-gray-200/50 dark:bg-gray-800 text-[10px] font-bold text-gray-400 rounded-full">今天 14:30</span>
        </div>

        {/* Message Left */}
        <div className="flex items-start gap-3 max-w-[85%]">
          <img src="https://picsum.photos/100" className="size-10 rounded-full border-2 border-white shadow-sm shrink-0" alt="Shelter" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 px-1">萌宠收容所</span>
            <div className="bg-white dark:bg-surface-dark px-4 py-3 rounded-2xl rounded-tl-none shadow-sm text-[14px] leading-relaxed text-gray-700 dark:text-gray-200">
              你好！豆豆目前非常健康，已经打过第一针疫苗了。
            </div>
          </div>
        </div>

        {/* Message Right - Matching screenshot (Green background, black text) */}
        <div className="flex items-start gap-3 justify-end ml-auto max-w-[85%]">
          <div className="flex flex-col gap-1 items-end">
            <span className="text-[10px] font-bold text-gray-400 px-1">我</span>
            <div className="bg-primary text-[#0d1b12] px-4 py-3 rounded-2xl rounded-tr-none shadow-md text-[14px] font-bold leading-relaxed">
              太好了，请问什么时候可以去线下看看它？
            </div>
            <span className="text-[9px] font-bold text-primary mt-1">已读</span>
          </div>
          <img src="https://picsum.photos/105" className="size-10 rounded-full border-2 border-white shadow-sm shrink-0" alt="Me" />
        </div>

        {/* Message Left 2 */}
        <div className="flex items-start gap-3 max-w-[85%]">
          <img src="https://picsum.photos/100" className="size-10 rounded-full border-2 border-white shadow-sm shrink-0" alt="Shelter" />
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 px-1">萌宠收容所</span>
            <div className="bg-white dark:bg-surface-dark px-4 py-3 rounded-2xl rounded-tl-none shadow-sm text-[14px] leading-relaxed text-gray-700 dark:text-gray-200">
              我们周末下午 2 点到 6 点都有空。您看这个周六方便吗？
            </div>
          </div>
        </div>
      </main>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-surface-dark p-4 pb-8 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3 z-50">
        <button className="text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[28px]">mic</span>
        </button>
        <div className="flex-1 bg-gray-100 dark:bg-gray-800/50 rounded-full flex items-center px-4 py-2.5">
          <input className="flex-1 bg-transparent border-none text-sm focus:ring-0 placeholder-gray-400 text-gray-700 dark:text-gray-200" placeholder="请输入消息..." />
          <button className="text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">mood</span>
          </button>
        </div>
        <button className="text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined text-[28px]">add_circle</span>
        </button>
        <button className="size-10 bg-primary text-[#0d1b12] rounded-full flex items-center justify-center shadow-lg shadow-primary/30 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-xl font-bold">send</span>
        </button>
      </div>
    </div>
  );
};

export default ChatDetail;
