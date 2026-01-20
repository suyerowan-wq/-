
import React, { useState } from 'react';
import QianniuPluginPrototype, { ErrorCategory } from './components/QianniuPluginPrototype';
import { ArrowRight, ShieldAlert, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<ErrorCategory>('DIAGNOSTIC');

  const scenarios: { type: ErrorCategory; title: string; desc: string; icon: string; color: string }[] = [
    { 
      type: 'DIAGNOSTIC', 
      title: '面板授权异常排查界面', 
      desc: '', // 已删除描述文字
      icon: '⚙️',
      color: 'border-orange-500'
    },
    { 
      type: 'EXPIRED', 
      title: '应用过期 - 拦截界面', 
      desc: '', // 文案删除
      icon: '🗓️',
      color: 'border-red-500'
    },
    { 
      type: 'SUCCESS', 
      title: '验证完成', 
      desc: '演示排查对齐后，系统自动恢复连接的反馈效果。',
      icon: '✅',
      color: 'border-emerald-500'
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row items-center justify-center p-8 lg:p-20 gap-20 font-sans select-none overflow-x-hidden">
      
      {/* 控制面板 */}
      <div className="w-full max-w-xl space-y-10 animate-in slide-in-from-left-8 duration-700">
        <div className="space-y-6">
          {/* 将字号从 6xl 缩小 2 个档位到 4xl */}
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight">
            <span className="text-blue-600">prd</span>说明
          </h1>
          
          {/* 描述文字盒子 */}
          <div className="bg-white/70 backdrop-blur-xl border border-slate-200 p-6 rounded-[2rem] shadow-sm max-w-md">
            <div className="text-slate-500 leading-relaxed text-[11px] font-bold space-y-4">
              <div>
                <p className="text-slate-800 font-black mb-1">【淘宝面板未连接】</p>
                <p className="pl-1">- web端开关开启后，若千牛面板未连接，客户端显示此页面</p>
                <p className="pl-1">- 六种情况未连接（具体看下方排查逻辑分布）</p>
              </div>
              <div>
                <p className="text-slate-800 font-black mb-1">【验证连接】</p>
                <p className="pl-1">- 失败后显示失败，点击可重试</p>
                <p className="pl-1">- 成功后展示验证完成界面</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {scenarios.map(s => (
            <button
              key={s.type}
              onClick={() => setCurrentCategory(s.type)}
              className={`group w-full p-6 rounded-[2rem] text-left transition-all border-2 flex items-center gap-6 ${
                currentCategory === s.type 
                  ? `bg-white ${s.color} shadow-2xl shadow-blue-100/50 -translate-y-1` 
                  : 'bg-slate-50 border-transparent text-slate-500 hover:bg-white hover:border-slate-200'
              }`}
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-sm">
                {s.icon}
              </div>
              <div className="flex-1">
                <h4 className={`text-xl font-black ${currentCategory === s.type ? 'text-slate-900' : 'text-slate-600'}`}>{s.title}</h4>
                {s.desc && <p className="text-sm text-slate-400 mt-1.5 font-bold leading-snug">{s.desc}</p>}
              </div>
              <ArrowRight className={`transition-transform duration-300 ${currentCategory === s.type ? 'translate-x-2 text-blue-500' : 'opacity-0'}`} />
            </button>
          ))}
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-slate-200 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-5">
             <ShieldAlert size={80} />
           </div>
           <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-5">排查逻辑分布 / LOGIC</h5>
           <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div className="space-y-2">
                 <p className="text-[11px] font-black text-blue-600 uppercase tracking-wider">A. 主账号 (管理端)</p>
                 <ul className="space-y-1.5">
                   <li className="flex items-center gap-2 text-[12px] font-bold text-slate-600 leading-tight">· 应用过期续费</li>
                   <li className="flex items-center gap-2 text-[12px] font-bold text-slate-600 leading-tight">· 购买后应用授权</li>
                   <li className="flex items-center gap-2 text-[12px] font-bold text-slate-600 leading-tight">· 为员工开启辅助接待权限</li>
                 </ul>
              </div>
              <div className="space-y-2">
                 <p className="text-[11px] font-black text-purple-600 uppercase tracking-wider">B. 子账号 (工作台)</p>
                 <ul className="space-y-1.5">
                   <li className="flex items-center gap-2 text-[12px] font-bold text-slate-600 leading-tight">· 自研面板开关开启</li>
                   <li className="flex items-center gap-2 text-[12px] font-bold text-slate-600 leading-tight">· 标签排序首位</li>
                   <li className="flex items-center gap-2 text-[12px] font-bold text-slate-600 leading-tight">· 下拉滚动激活</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>

      {/* 原型展示区域 */}
      <div className="relative group perspective-1000">
        <div className="absolute -inset-20 bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        <QianniuPluginPrototype category={currentCategory} />
        
        {/* 悬浮装饰 */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/50 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center animate-bounce hidden lg:flex">
           <Zap size={40} className="text-blue-500" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

export default App;
