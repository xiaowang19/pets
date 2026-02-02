
import React from 'react';

const Profile: React.FC = () => {
  const services = [
    { label: '个人信息', icon: 'person' },
    { label: '领养记录', icon: 'history_edu' },
    { label: '我的宠物', icon: 'pets' },
    { label: '隐私设置', icon: 'lock' },
    { label: '帮助中心', icon: 'help_outline' }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark animate-fade-in">
      <header className="p-4 flex justify-between items-center">
        <span className="material-symbols-outlined text-2xl">settings</span>
        <h2 className="text-lg font-extrabold">个人中心</h2>
        <span className="material-symbols-outlined text-2xl">notifications</span>
      </header>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="relative">
            <img src="https://picsum.photos/200" alt="Avatar" className="size-20 rounded-full border-4 border-white shadow-md" />
            <div className="absolute bottom-0 right-0 size-6 bg-primary rounded-full border-4 border-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[10px] text-[#0d1b12] material-symbols-filled">check</span>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-[#0d1b12]">爱宠人士_123</h3>
            <div className="mt-1 bg-primary/20 text-primary-dark px-2.5 py-0.5 rounded-full text-[10px] font-bold w-fit flex items-center gap-1">
              <span className="material-symbols-outlined text-xs material-symbols-filled">stars</span> 普通会员
            </div>
          </div>
        </div>

        <button className="w-full py-4 bg-primary text-[#0d1b12] rounded-3xl font-extrabold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all mb-8">
          编辑资料
        </button>

        <div className="flex gap-4 mb-10">
          {[
            { val: '2', label: '我的领养' },
            { val: '15', label: '我的收藏' },
            { val: '8', label: '我的动态' }
          ].map(stat => (
            <div key={stat.label} className="flex-1 bg-white dark:bg-surface-dark border border-primary/10 rounded-3xl p-4 flex flex-col items-center shadow-sm">
              <span className="text-2xl font-extrabold">{stat.val}</span>
              <span className="text-[10px] font-bold text-gray-400 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-extrabold mb-4 px-2">我的服务</h3>
        <div className="space-y-3">
          {services.map(s => (
            <div key={s.label} className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm group active:bg-primary/5 transition-colors cursor-pointer">
              <div className="size-11 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">{s.icon}</span>
              </div>
              <span className="flex-1 font-bold text-gray-700 dark:text-gray-200">{s.label}</span>
              <span className="material-symbols-outlined text-gray-300">chevron_right</span>
            </div>
          ))}
        </div>

        <button className="w-full mt-10 py-4 bg-red-50 text-red-500 font-extrabold rounded-3xl border border-red-100 active:bg-red-100 transition-colors">
          退出登录
        </button>
      </div>
    </div>
  );
};

export default Profile;
