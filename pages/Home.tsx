
import React, { useState, useEffect } from 'react';
import PetCard from '../components/PetCard';
import { petsApi, Pet as ApiPet } from '../src/api';
import { Pet } from '../types';

const Home: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('狗狗');
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { label: '狗狗', emoji: '🐶' },
    { label: '猫咪', emoji: '🐱' },
    { label: '兔子', emoji: '🐰' },
    { label: '鸟类', emoji: '🐦' }
  ];

  useEffect(() => {
    loadPets();
  }, [activeCategory]);

  const loadPets = async () => {
    try {
      setLoading(true);
      const data = await petsApi.getPets({ category: activeCategory });
      const transformedPets: Pet[] = data.map((pet: ApiPet) => ({
        id: pet.id,
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        gender: pet.gender === '公' ? '公' : '母',
        distance: pet.distance || '0km',
        timeLabel: pet.time_label || '刚刚',
        image: pet.image,
        description: pet.description || '',
        tags: pet.tags || [],
        healthStatus: pet.health_status || [],
        owner: {
          name: pet.owner.name,
          avatar: pet.owner.avatar,
          role: pet.owner.role,
          responseRate: pet.owner.response_rate
        },
        details: {
          size: pet.size || '中型',
          energy: pet.energy || '中等',
          friendliness: pet.friendliness || '温顺',
          shedding: pet.shedding || '适中'
        }
      }));
      setPets(transformedPets);
    } catch (error) {
      console.error('Failed to load pets:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer">
            <div className="size-11 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
              <img src="https://picsum.photos/100" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 size-3.5 bg-primary rounded-full border-2 border-white"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">当前位置</span>
            <div className="flex items-center gap-0.5 cursor-pointer">
              <span className="font-bold text-sm text-[#0d1b12] dark:text-white">朝阳区, 北京</span>
              <span className="material-symbols-outlined text-base">expand_more</span>
            </div>
          </div>
        </div>
        <button className="size-10 flex items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-sm border border-gray-100 dark:border-gray-800 text-gray-600">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mt-2 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-400">search</span>
          </div>
          <input 
            className="block w-full pl-11 pr-14 py-4 bg-white dark:bg-surface-dark border-none rounded-2xl text-sm shadow-sm placeholder-gray-400 text-[#0d1b12] dark:text-white focus:ring-2 focus:ring-primary/20 focus:outline-none transition-shadow" 
            placeholder="搜索品种, 年龄..." 
            type="text" 
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <button className="bg-primary/20 text-primary-dark rounded-xl p-2">
              <span className="material-symbols-outlined text-[22px]">tune</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="px-4 mb-6">
        <h1 className="text-[32px] font-display font-extrabold text-[#0d1b12] dark:text-white leading-[1.15]">
          发现你的<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-green-500 to-green-600">新伙伴</span>
        </h1>
      </div>

      {/* Categories */}
      <div className="flex gap-3 px-4 overflow-x-auto hide-scrollbar pb-2 mb-6 snap-x">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.label)}
            className={`snap-start shrink-0 flex items-center gap-2 px-5 py-3 rounded-full transition-all duration-300 active:scale-95 ${
              activeCategory === cat.label 
                ? 'bg-[#0d1b12] dark:bg-primary text-white dark:text-[#0d1b12] shadow-lg shadow-gray-200 dark:shadow-green-900/30' 
                : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300'
            }`}
          >
            <span className="text-xl">{cat.emoji}</span>
            <span className="text-sm font-bold">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="px-4 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#0d1b12] dark:text-white">为你推荐</h2>
        <button className="text-sm font-bold text-gray-400 flex items-center gap-0.5">
          查看全部 <span className="material-symbols-outlined text-base">chevron_right</span>
        </button>
      </div>

      <div className="px-4 grid grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 text-center py-8 text-gray-400">加载中...</div>
        ) : pets.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-gray-400">暂无宠物</div>
        ) : (
          pets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
