
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdoptionForm: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark animate-fade-in flex flex-col">
      <header className="sticky top-0 z-50 flex items-center bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md p-4 justify-between border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="size-11 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold flex-1 text-center pr-11">填写领养申请</h2>
      </header>

      <div className="flex w-full flex-col items-center justify-center py-6">
        <div className="flex items-center gap-3">
          <div className={`h-2.5 rounded-full transition-all duration-500 ${step === 1 ? 'w-8 bg-primary shadow-lg shadow-primary/30' : 'w-2.5 bg-gray-200'}`}></div>
          <div className={`h-2.5 rounded-full transition-all duration-500 ${step === 2 ? 'w-8 bg-primary shadow-lg shadow-primary/30' : 'w-2.5 bg-gray-200'}`}></div>
          <div className={`h-2.5 rounded-full transition-all duration-500 ${step === 3 ? 'w-8 bg-primary shadow-lg shadow-primary/30' : 'w-2.5 bg-gray-200'}`}></div>
        </div>
        <p className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">步骤 {step}/3</p>
      </div>

      <main className="flex-1 px-6 space-y-10 pb-32">
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <span className="material-symbols-outlined text-[20px]">person</span>
            </div>
            <h2 className="text-xl font-bold">基本信息</h2>
          </div>
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">您的姓名</span>
              <input className="w-full rounded-2xl border-gray-100 bg-white dark:bg-surface-dark dark:border-gray-800 p-4 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="请输入您的真实姓名" />
            </div>
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">联系电话</span>
              <input className="w-full rounded-2xl border-gray-100 bg-white dark:bg-surface-dark dark:border-gray-800 p-4 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary" placeholder="请输入 11 位手机号码" type="tel" />
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <span className="material-symbols-outlined text-[20px]">home</span>
            </div>
            <h2 className="text-xl font-bold">居住环境</h2>
          </div>
          <div className="space-y-6">
             <div className="grid grid-cols-2 gap-3">
               {['自有住房', '整租', '合租', '宿舍'].map((type, idx) => (
                 <label key={type} className="relative cursor-pointer">
                    <input type="radio" name="housing" className="peer sr-only" defaultChecked={idx===0} />
                    <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                      <span className="material-symbols-outlined mb-2 text-gray-400 peer-checked:text-primary">
                        {idx === 0 ? 'apartment' : idx === 1 ? 'house' : idx === 2 ? 'bedroom_parent' : 'school'}
                      </span>
                      <span className="text-sm font-bold text-gray-600 dark:text-gray-300 peer-checked:text-[#0d1b12]">{type}</span>
                    </div>
                 </label>
               ))}
             </div>
             <label className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-surface-dark">
                <input type="checkbox" className="size-5 rounded-lg text-primary focus:ring-primary/20 border-gray-200" />
                <span className="text-sm font-bold text-gray-700">家中已安装纱窗/封窗防护</span>
             </label>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-4 pb-10 bg-white/95 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800">
        <button 
          onClick={() => navigate('/progress')}
          className="w-full h-14 bg-primary text-[#0d1b12] rounded-full text-lg font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
        >
          <span>下一步</span>
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
        <p className="text-center text-[10px] text-gray-400 font-bold mt-3 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-xs">lock</span> 您的信息将被严格保密
        </p>
      </div>
    </div>
  );
};

export default AdoptionForm;
