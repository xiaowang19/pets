
import React from 'react';
import { Pet, PetGender } from '../types';
import { useNavigate } from 'react-router-dom';

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/pet/${pet.id}`)}
      className="group bg-white dark:bg-surface-dark rounded-3xl p-2.5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col h-full active:scale-[0.98]"
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-3 bg-gray-100 dark:bg-gray-800">
        <img 
          src={pet.image} 
          alt={pet.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
        />
        <button 
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-2 right-2 size-8 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">favorite</span>
        </button>
        <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-lg">
          <span className="text-[10px] font-medium text-white flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">near_me</span> {pet.distance}
          </span>
        </div>
      </div>
      <div className="px-1 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-[#0d1b12] dark:text-white text-base truncate">{pet.name}</h3>
          <div className={`p-0.5 rounded-md flex items-center justify-center ${pet.gender === PetGender.MALE ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-500'}`}>
            <span className="material-symbols-outlined text-sm">
              {pet.gender === PetGender.MALE ? 'male' : 'female'}
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 truncate">{pet.breed}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-medium">
            {pet.age}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">{pet.timeLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
