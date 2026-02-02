
import React, { useState, useEffect } from 'react';
import { postsApi, Post as ApiPost } from '../src/api';
import { Post } from '../types';

const Community: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('领养故事');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ['领养故事', '养宠经验', '寻宠启事', '宠物美照'];

  useEffect(() => {
    loadPosts();
  }, [activeCategory]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await postsApi.getPosts({ category: activeCategory });
      const transformedPosts: Post[] = data.map((post: ApiPost) => ({
        id: post.id,
        title: post.title,
        author: post.author.name,
        authorAvatar: post.author.avatar,
        image: post.image,
        likes: post.likes_count.toString()
      }));
      setPosts(transformedPosts);
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark animate-fade-in relative">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md pt-4">
        <div className="flex items-center px-4 pb-2 justify-between">
          <span className="material-symbols-outlined text-2xl text-[#0d1b12]">search</span>
          <h2 className="text-lg font-extrabold">发现社区</h2>
          <span className="material-symbols-outlined text-2xl text-[#0d1b12]">notifications</span>
        </div>

        <div className="flex gap-3 px-4 py-4 overflow-x-auto hide-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${activeCategory === cat ? 'bg-primary text-[#0d1b12]' : 'bg-primary/10 text-primary-dark'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main className="p-3">
        {loading ? (
          <div className="text-center py-8 text-gray-400">加载中...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-gray-400">暂无帖子</div>
        ) : (
          <div className="masonry-grid">
            {posts.map((post) => (
              <div key={post.id} className="masonry-item bg-white dark:bg-surface-dark rounded-3xl overflow-hidden shadow-sm border border-black/5 flex flex-col group active:scale-[0.98] transition-transform">
                <img src={post.image} alt={post.title} className="w-full object-cover" />
                <div className="p-3">
                  <h3 className="text-xs font-extrabold leading-snug line-clamp-2 mb-3 text-[#0d1b12] dark:text-white">{post.title}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 max-w-[60%]">
                      <img src={post.authorAvatar} alt={post.author} className="size-5 rounded-full object-cover" />
                      <span className="text-[10px] font-bold text-gray-400 truncate">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-0.5 text-gray-400">
                      <span className="material-symbols-outlined text-sm">favorite</span>
                      <span className="text-[10px] font-extrabold">{post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <button className="fixed bottom-28 right-6 size-14 bg-primary text-[#0d1b12] rounded-full shadow-xl shadow-primary/30 flex items-center justify-center transform active:scale-90 transition-transform z-40">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
};

export default Community;
