
import React, { useState, useEffect } from 'react';
import { applicationsApi, AdoptionApplication as ApiApplication } from '../src/api';
import { AdoptionApplication } from '../types';
import { useNavigate } from 'react-router-dom';

const Progress: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('进行中');
  const [applications, setApplications] = useState<AdoptionApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, [activeTab]);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const statusMap: Record<string, string> = {
        '进行中': 'pending',
        '已完成': 'completed',
        '已取消': 'cancelled'
      };
      const data = await applicationsApi.getApplications({ status: statusMap[activeTab] });
      const transformedApps: AdoptionApplication[] = data.map((app: ApiApplication) => ({
        id: app.id,
        petName: app.pet_name,
        petBreed: app.pet_breed,
        petAge: app.pet_age,
        petGender: app.pet_gender === '公' ? '公' : '母',
        petImage: app.pet_image,
        status: app.status,
        currentStep: app.current_step,
        totalSteps: app.total_steps,
        progressLabel: app.progress_label,
        history: app.history.map(h => ({
          title: h.title,
          time: h.time,
          description: h.description,
          completed: h.completed,
          isOngoing: h.is_ongoing
        }))
      }));
      setApplications(transformedApps);
    } catch (error) {
      console.error('Failed to load applications:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark animate-fade-in">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md px-4 py-4 border-b border-gray-50 flex items-center">
        <button onClick={() => navigate(-1)} className="size-11 flex items-center justify-center rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="text-lg font-extrabold flex-1 text-center pr-11">领养进度</h2>
      </header>

      <div className="bg-white dark:bg-surface-dark px-4 flex gap-8 border-b border-gray-100">
        {['进行中', '已完成', '已取消'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 text-sm font-bold relative transition-colors ${activeTab === tab ? 'text-[#0d1b12] dark:text-white' : 'text-gray-400'}`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
          <div className="text-center py-8 text-gray-400">加载中...</div>
        ) : applications.length === 0 ? (
          <div className="text-center py-8 text-gray-400">暂无申请</div>
        ) : (
          applications.map(app => (
            <div key={app.id} className="bg-white dark:bg-surface-dark rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm p-4">
              <div className="flex gap-4 mb-4">
                <img src={app.petImage} alt={app.petName} className="size-20 rounded-2xl object-cover shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-extrabold text-[#0d1b12] dark:text-white">{app.petName}</h3>
                      <p className="text-xs text-gray-500 font-bold">{app.petBreed} · {app.petAge} · {app.petGender}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-primary/10 text-primary-dark text-[10px] font-extrabold rounded-lg">{app.status}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                 <div className="flex justify-between items-center mb-2">
                   <p className="text-[11px] font-bold text-gray-400">当前进度：{app.progressLabel}</p>
                   <p className="text-[11px] font-bold text-primary">{app.currentStep} / {app.totalSteps}</p>
                 </div>
                 <div className="w-full h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                   <div className="h-full bg-primary rounded-full shadow-[0_0_8px_rgba(19,236,91,0.5)] transition-all duration-700" style={{ width: `${(app.currentStep / app.totalSteps) * 100}%` }}></div>
                 </div>
              </div>

              <div className="grid grid-cols-4 gap-1 mb-4">
                 {[
                   { icon: 'description', label: '提交申请' },
                   { icon: 'pending_actions', label: '资料审核' },
                   { icon: 'home', label: '线下家访' },
                   { icon: 'favorite', label: '领养成功' }
                 ].map((step, idx) => {
                   const isCompleted = idx < app.currentStep;
                   const isCurrent = idx === app.currentStep - 1;
                   return (
                     <div key={idx} className="flex flex-col items-center gap-1.5 opacity-100">
                       <span className={`material-symbols-outlined text-lg ${isCompleted ? 'text-primary' : isCurrent ? 'text-primary animate-pulse' : 'text-gray-200'}`}>
                         {isCompleted ? 'check_circle' : step.icon}
                       </span>
                       <span className={`text-[9px] font-bold ${isCompleted ? 'text-[#0d1b12] dark:text-white' : 'text-gray-400'}`}>{step.label}</span>
                     </div>
                   );
                 })}
              </div>

              <div className="flex justify-end gap-2">
                <button className="px-5 py-2.5 rounded-2xl border border-gray-100 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-300">修改申请</button>
                <button className="px-5 py-2.5 rounded-2xl bg-[#0d1b12] dark:bg-primary text-white dark:text-[#0d1b12] text-xs font-bold">查看详情</button>
              </div>
            </div>
          ))
        )}

        {applications.length > 0 && applications[0].history.length > 0 && (
          <div className="mt-8 px-2">
            <h4 className="text-sm font-extrabold text-[#0d1b12] dark:text-white mb-6 uppercase tracking-widest opacity-60">详细进度记录</h4>
            <div className="relative pl-8 space-y-10">
              <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-gray-100 dark:bg-gray-800"></div>
              {applications[0].history.map((h, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[30px] top-0 size-6 rounded-full flex items-center justify-center z-10 ${h.completed ? 'bg-primary text-white' : h.isOngoing ? 'bg-white border-2 border-primary text-primary' : 'bg-gray-200 text-white'}`}>
                    <span className="material-symbols-outlined text-sm">{h.completed ? 'check' : h.isOngoing ? 'pending' : 'circle'}</span>
                  </div>
                  <div>
                    <h5 className={`font-bold text-sm ${h.completed || h.isOngoing ? 'text-[#0d1b12] dark:text-white' : 'text-gray-400'}`}>{h.title}</h5>
                    <p className="text-[10px] font-bold text-primary mt-0.5">{h.time}</p>
                    {h.description && <p className="text-xs text-gray-500 mt-2 leading-relaxed">{h.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
