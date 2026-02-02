
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pet } from '../types';
import { MOCK_PETS } from '../constants';

const PetDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const found = MOCK_PETS.find(p => p.id === id);
    if (found) setPet(found);
  }, [id]);

  if (!pet) return <div>Loading...</div>;

  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark animate-fade-in">
      {/* Top Nav */}
      <div className="fixed top-0 left-0 w-full z-50 p-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="size-11 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex gap-3">
          <button className="size-11 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
            <span className="material-symbols-outlined">share</span>
          </button>
          <button className="size-11 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
            <span className="material-symbols-outlined">favorite</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="h-[45vh] w-full relative">
        <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
          <div className="w-2 h-2 rounded-full bg-white/50"></div>
        </div>
      </div>

      {/* Content Sheet */}
      <div className="relative -mt-8 rounded-t-[32px] bg-background-light dark:bg-background-dark p-6 pb-32 shadow-2xl">
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#0d1b12] dark:text-white mb-1">{pet.name}</h1>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <span className="material-symbols-outlined text-base">location_on</span>
              <span>上海 · 浦东新区</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-primary font-bold text-lg">待领养</div>
            <div className="text-xs text-gray-400">刚刚更新</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex gap-2 py-4 overflow-x-auto hide-scrollbar">
          {pet.tags.map(tag => (
            <span key={tag} className="flex-shrink-0 px-4 py-2 bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-bold shadow-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* Health */}
        <div className="mt-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">健康状况</h3>
          <div className="flex flex-wrap gap-3">
            <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg">vaccines</span> 已疫苗
            </div>
            <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg">bug_report</span> 已驱虫
            </div>
            <div className="bg-red-50 text-red-500 px-3 py-1.5 rounded-xl text-sm font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg">content_cut</span> 未绝育
            </div>
          </div>
        </div>

        {/* Owner Card */}
        <div className="mt-8 p-4 bg-white dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-gray-800 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={pet.owner.avatar} alt={pet.owner.name} className="size-12 rounded-full border-2 border-primary/20" />
              <div className="absolute bottom-0 right-0 size-3.5 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <div className="font-bold text-[#0d1b12] dark:text-white">{pet.owner.name}</div>
              <div className="text-[11px] text-gray-400">{pet.owner.role} · 回复率 {pet.owner.responseRate}</div>
            </div>
          </div>
          <span className="material-symbols-outlined text-gray-300">chevron_right</span>
        </div>

        {/* Story */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-[#0d1b12] dark:text-white mb-3">关于{pet.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
            {pet.description} 它现在正在寻找一个温暖的家，如果你有耐心并且喜欢运动，{pet.name}绝对是你最好的伴侣。它对猫咪也很友好，不护食，不乱叫...
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl">
            <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">体型</div>
            <div className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-500 text-lg">aspect_ratio</span> {pet.details.size}
            </div>
          </div>
          <div className="p-4 bg-orange-50/50 dark:bg-orange-900/10 rounded-2xl">
            <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">能量值</div>
            <div className="font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500 text-lg">bolt</span> {pet.details.energy}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 p-4 pb-10 z-50">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <button className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-primary transition-colors px-2">
            <span className="material-symbols-outlined text-[28px]">chat_bubble</span>
            <span className="text-[10px] font-bold">咨询</span>
          </button>
          <button 
            onClick={() => navigate('/form')}
            className="flex-1 h-14 bg-primary text-[#0d1b12] font-extrabold text-lg rounded-full shadow-lg shadow-primary/30 active:scale-95 transition-all"
          >
            申请领养
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetail;
