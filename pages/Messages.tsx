
import React, { useState, useEffect } from 'react';
import { messagesApi, Conversation } from '../src/api';
import { Message } from '../types';
import { useNavigate } from 'react-router-dom';

const Messages: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState('聊天');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await messagesApi.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark animate-fade-in">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md pt-4 border-b border-gray-50">
        <div className="flex items-center px-4 pb-2">
          <button className="size-11 flex items-center justify-center rounded-full hover:bg-gray-100">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="text-lg font-extrabold flex-1 text-center pr-11">消息中心</h2>
        </div>
        
        <div className="px-4 py-3">
          <div className="bg-gray-100/50 dark:bg-surface-dark p-1 rounded-2xl flex">
            {['通知', '聊天'].map(t => (
              <button 
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === t ? 'bg-white dark:bg-gray-800 shadow-sm text-[#0d1b12] dark:text-white' : 'text-gray-400'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="p-4">
        <div className="relative mb-6">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-[20px]">search</span>
          <input className="w-full bg-white dark:bg-surface-dark border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm shadow-sm focus:ring-2 focus:ring-primary/20" placeholder="搜索联系人或消息内容" />
        </div>

        <div className="space-y-1">
          {loading ? (
            <div className="text-center py-8 text-gray-400">加载中...</div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-8 text-gray-400">暂无消息</div>
          ) : (
            conversations.map(conv => (
              <div 
                key={conv.id} 
                onClick={() => navigate(`/chat/${conv.other_user_id}`)}
                className="flex items-center gap-4 py-4 px-2 hover:bg-white dark:hover:bg-surface-dark rounded-3xl transition-colors cursor-pointer group"
              >
                <div className="relative shrink-0">
                  <img src={conv.other_user.avatar} alt={conv.other_user.name} className="size-14 rounded-full border-2 border-white shadow-sm" />
                  {conv.unread_count > 0 && (
                    <div className={`absolute -top-0.5 -right-0.5 ${conv.unread_count > 1 ? 'size-6 flex items-center justify-center text-[10px] font-extrabold text-white' : 'size-3.5'} bg-red-500 border-2 border-white rounded-full`}>
                      {conv.unread_count > 1 ? conv.unread_count : ''}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className="text-sm font-extrabold text-[#0d1b12] dark:text-white truncate">{conv.other_user.name}</h3>
                    <span className="text-[10px] font-bold text-gray-400">{formatTime(conv.last_message_time)}</span>
                  </div>
                  <p className={`text-xs truncate ${conv.unread_count > 0 ? 'text-[#0d1b12] dark:text-gray-300 font-bold' : 'text-gray-400'}`}>{conv.last_message}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
