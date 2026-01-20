
import React, { useState, useEffect } from 'react';
import { 
  X, Settings, RefreshCw, Info, Zap, 
  ArrowRight, AlertTriangle, Layout, CheckCircle2, 
  UserCheck, ShieldAlert, Eye, ChevronDown, ArrowDown, 
  ShieldX, Copy, HelpCircle, CornerDownRight, Flag, Send, MousePointerClick
} from 'lucide-react';

export type ErrorCategory = 'DIAGNOSTIC' | 'SUCCESS' | 'EXPIRED';

interface Props {
  category: ErrorCategory;
}

const QianniuLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M4 6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V6Z" fill="white" />
    <path fillRule="evenodd" clipRule="evenodd" d="M7.5 8C7.5 7.44772 7.94772 7 8.5 7H15.5C16.0523 7 16.5 7.44772 16.5 8V11.5C16.5 13.433 14.933 15 13 15H8.5C7.94772 15 7.5 14.5523 7.5 14V8ZM9.5 9V13H13C13.8284 13 14.5 12.3284 14.5 11.5V9H9.5Z" fill="#0052d9" />
  </svg>
);

const CustomerServiceRobotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
    <path d="M10 11V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 11V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 6V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 16L19 17.5V14.5L16 16Z" fill="#3b82f6" />
  </svg>
);

const QianniuPluginPrototype: React.FC<Props> = ({ category }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [phase, setPhase] = useState<'SCANNING' | 'DIAGNOSTIC' | 'EXPIRED'>('SCANNING');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [inlineVerifyStatus, setInlineVerifyStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  useEffect(() => {
    setIsVerified(false);
    setInlineVerifyStatus('idle');
    if (category === 'EXPIRED') {
      setPhase('EXPIRED');
    } else {
      setPhase('SCANNING');
      const timer = setTimeout(() => setPhase('DIAGNOSTIC'), 800);
      return () => clearTimeout(timer);
    }
  }, [category]);

  const handleInlineVerify = async () => {
    if (inlineVerifyStatus === 'loading') return;
    setInlineVerifyStatus('loading');
    await new Promise(r => setTimeout(r, 1500));
    if (category === 'SUCCESS') {
      setIsVerified(true);
      setInlineVerifyStatus('idle');
    } else {
      setInlineVerifyStatus('error');
    }
  };

  const renderDiagnosticList = () => (
    <div className="flex-1 overflow-hidden px-3 pt-3 pb-24 space-y-3 min-h-0">
      <div className="bg-[#e6f4ff] border border-[#91caff] p-2 rounded-lg flex items-center gap-2 shrink-0">
        <div className="w-4 h-4 bg-[#0052d9] rounded-full flex items-center justify-center shrink-0 shadow-sm">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping absolute" />
          <Info size={10} className="text-white relative z-10" />
        </div>
        <p className="text-[12px] text-gray-800 font-bold tracking-tight">注意：千牛面板连接异常，请按照以下步骤进行排查</p>
      </div>

      {/* 1. 确认开启“自研侧边栏面板” */}
      <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-[#262626] text-white text-[11px] flex items-center justify-center rounded-full font-black">1</span>
          <h5 className="text-[13px] font-black text-gray-800 tracking-tight">确认开启“自研侧边栏面板”</h5>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="bg-[#f5f5f5] p-2 rounded-lg border border-gray-100 flex items-center gap-2">
               <div className="w-4 h-4 border border-[#0052d9] rounded flex items-center justify-center bg-white"><div className="w-2 h-2 bg-[#0052d9] rounded-sm" /></div>
               <span className="text-[11px] font-bold text-gray-600 truncate">若没有该选项需联系主账号授权</span>
            </div>
          </div>
          <div className="group/settings shrink-0 w-16 h-10 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden relative cursor-pointer hover:border-blue-300 transition-all shadow-sm active:scale-95" onClick={() => setPreviewImage('面板设置项核对')}>
            <div className="absolute inset-0 bg-blue-500/0 group-hover/settings:bg-blue-500/10 transition-colors flex items-center justify-center z-10"><Eye size={12} className="text-[#0052d9] opacity-0 group-hover/settings:opacity-100 transition-opacity" /></div>
            <div className="p-1 space-y-0.5 scale-[0.5] origin-top-left w-[200%]">
               <div className="flex items-center justify-between border-b border-gray-100 pb-0.5"><div className="h-2 w-10 bg-gray-200 rounded" /><div className="w-5 h-3 bg-blue-500 rounded-full" /></div>
               <div className="bg-blue-50/50 p-1 border border-blue-100 rounded"><div className="h-2 w-10 bg-blue-800 rounded mb-0.5" /><div className="w-5 h-3 bg-blue-500 rounded-full" /></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 辅助接待权限确认 */}
      <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-[#262626] text-white text-[11px] flex items-center justify-center rounded-full font-black">2</span>
          <h5 className="text-[13px] font-black text-gray-800 tracking-tight">辅助接待权限确认</h5>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex-1">
             <p className="text-[12px] text-gray-400 leading-tight font-medium">对话页不显示机器人需开启权限 <button onClick={() => setPreviewImage('辅助接待权限教程')} className="text-[#0052d9] font-black ml-1 hover:underline">查看教程</button></p>
          </div>
          <div className="group/toolbar shrink-0 w-24 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-around px-1 relative cursor-pointer active:scale-95 transition-all shadow-sm overflow-hidden" onClick={() => setPreviewImage('对话框工具栏按钮示意图')}>
             <div className="absolute inset-0 bg-blue-500/0 group-hover/toolbar:bg-blue-500/5 transition-colors flex items-center justify-center z-10"><Eye size={12} className="text-[#0052d9] opacity-0 group-hover/toolbar:opacity-100 transition-opacity" /></div>
             <div className="p-1 border border-[#ff4d4f] rounded-sm bg-[#fff1f0] scale-90"><CustomerServiceRobotIcon className="w-4 h-4 text-gray-700" /></div>
             <div className="flex items-center text-gray-300 gap-0.5 scale-75"><Layout size={12} /><ChevronDown size={8} /></div>
          </div>
        </div>
      </div>

      {/* 3. 标签排序核对 */}
      <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-[#722ed1] text-white text-[11px] flex items-center justify-center rounded-full font-black">3</span>
          <h5 className="text-[13px] font-black text-gray-800 tracking-tight">标签排序核对</h5>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex-1"><p className="text-[12px] text-gray-400 leading-tight font-medium">确保“智能客服”排在第一个。</p></div>
          <div className="group/tab-mock shrink-0 w-20 h-9 bg-gray-50 border border-dashed border-gray-200 rounded-lg overflow-hidden relative cursor-pointer active:scale-95 transition-all" onClick={() => setPreviewImage('标签排序截图预览')}>
             <div className="absolute inset-0 bg-blue-500/0 group-hover/tab-mock:bg-blue-500/10 transition-colors flex items-center justify-center z-10"><Eye size={12} className="text-[#0052d9] opacity-0 group-hover/tab-mock:opacity-100 transition-opacity" /></div>
             <div className="scale-[0.45] origin-top-left p-1 w-[250%]">
                <div className="flex items-end gap-1 mb-0"><div className="px-2 py-1 bg-[#0052d9] rounded-t-md text-white text-[10px] flex items-center justify-center font-black gap-1"><CustomerServiceRobotIcon className="w-4 h-4" />智能客服</div></div>
                <div className="h-1 w-full bg-[#0052d9]" />
             </div>
          </div>
        </div>
      </div>

      {/* 4. 滚动加载自研服务 */}
      <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 bg-[#722ed1] text-white text-[11px] flex items-center justify-center rounded-full font-black">4</span>
          <h5 className="text-[13px] font-black text-gray-800 tracking-tight">滚动加载自研服务</h5>
        </div>
        <div className="flex items-start gap-3">
          <div className="flex-1 bg-[#f0f5ff] p-2.5 rounded-xl border border-[#adc6ff] flex items-center gap-2 animate-pulse h-fit"><ArrowDown className="text-[#0052d9]" size={14} /><span className="text-[13px] font-black text-[#0052d9] tracking-tight">下拉到底开启“自研面板”</span></div>
          <div className="group/scroll-tip shrink-0 w-16 h-10 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden relative cursor-pointer hover:border-blue-300 transition-all shadow-sm active:scale-95" onClick={() => setPreviewImage('滚动到底部激活面板指引')}>
            <div className="absolute inset-0 bg-blue-500/0 group-hover/scroll-tip:bg-blue-500/10 transition-colors flex items-center justify-center z-10"><Eye size={12} className="text-[#0052d9] opacity-0 group-hover/scroll-tip:opacity-100 transition-opacity" /></div>
            <div className="scale-[0.5] origin-top-left p-1 w-[200%] h-[200%]">
               <div className="flex flex-col gap-1"><div className="h-1.5 w-full bg-gray-100 rounded" /><div className="h-1.5 w-full bg-gray-100 rounded" /><div className="h-2.5 w-full bg-blue-100 rounded border border-blue-200" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (phase === 'EXPIRED') {
       return (
         <div className="flex-1 flex flex-col bg-white animate-in zoom-in-95 min-h-0">
           <div className="bg-[#fff1f0] border-b border-[#ffa39e] px-4 py-2 flex items-center justify-between shrink-0">
              <span className="text-[#cf1322] text-[12px] font-medium flex items-center gap-2"><ShieldAlert size={12} className="shrink-0" />店铺授权过期</span>
              <X size={12} className="text-[#bfbfbf] cursor-pointer" />
           </div>
           <div className="flex-1 flex flex-col items-center justify-center p-8 text-center overflow-y-auto no-scrollbar">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-sm"><ShieldX size={40} /></div>
              <div className="space-y-4"><p className="text-[15px] font-black text-gray-800 tracking-tight">请联系主账号续费【探域智能体】应用</p><a href="#" className="text-blue-600 text-[13px] font-bold hover:underline block">（点击跳转授权教程）</a></div>
           </div>
         </div>
       );
    }

    if (isVerified) {
       return (
         <div className="flex-1 flex flex-col bg-[#f0f2f5] min-h-0 overflow-y-auto no-scrollbar pb-10">
           {/* 用户 & 商品状态栏 */}
           <div className="bg-white px-3 py-2 space-y-2 border-b border-gray-100 shrink-0">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                   <h2 className="text-[15px] font-black text-gray-800">时光荏苒99320089</h2>
                   <HelpCircle size={14} className="text-blue-400" />
                   <div className="bg-blue-50 border border-blue-100 rounded px-1 flex items-center gap-0.5">
                      <span className="text-[8px] font-bold text-blue-500">AI</span>
                   </div>
                </div>
                <Zap size={14} className="text-yellow-400" fill="currentColor" />
             </div>
             
             <div className="flex gap-2.5 relative">
                <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-100 shadow-sm shrink-0">
                   <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Product" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-0.5 min-w-0">
                   <div className="space-y-0.5">
                      <p className="text-[12px] font-bold text-gray-800 leading-[1.3] line-clamp-2">白色连衣裙子女夏2025新款法式茶歇小个子高级感...</p>
                      <p className="text-[11px] text-gray-400 font-medium">ID: 963491959872 <Copy size={10} className="inline ml-1 opacity-40 cursor-pointer" /></p>
                   </div>
                   <div className="flex items-center justify-end gap-3">
                      <button className="text-[11px] font-bold text-blue-600 hover:opacity-80">选sku</button>
                      <button className="text-[11px] font-bold text-blue-600 hover:opacity-80">切换商品</button>
                   </div>
                </div>
             </div>
           </div>

           {/* 聊天记录列表 */}
           <div className="p-3 space-y-4">
              {/* 卡片 1: 商品卖点 */}
              <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2">
                 <div className="flex items-center gap-2">
                    <div className="bg-yellow-500 text-white rounded w-5 h-5 flex items-center justify-center text-[10px] font-black shadow-sm">1</div>
                    <span className="text-[12px] font-black text-yellow-600">商品卖点</span>
                    <span className="text-[11px] text-gray-300 font-medium ml-1">11:19</span>
                    <div className="flex-1 border-b border-gray-200 border-dashed" />
                    <CornerDownRight size={12} className="text-gray-300" />
                    <button className="text-[11px] font-bold text-gray-400 border border-gray-200 px-2 py-0.5 rounded-md flex items-center gap-1 hover:bg-gray-100"><Send size={10} /> 已发送</button>
                 </div>
                 
                 <div className="bg-white rounded-[1.25rem] border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-3 flex gap-3 border-b border-gray-50 bg-gray-50/30">
                       <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=200&auto=format&fit=crop" className="w-8 h-8 rounded object-cover border border-gray-100 shadow-sm" alt="Mini" />
                       <p className="text-[11px] text-gray-500 line-clamp-1 flex-1 font-medium mt-1">白色连衣裙子女夏2025新款法式茶歇小个子高级感...</p>
                    </div>
                    <div className="p-4 space-y-4">
                       <div className="flex items-start gap-1">
                          <span className="text-[12px] text-yellow-600 font-black mt-0.5">1.</span>
                          <div className="flex-1 text-[12px] leading-relaxed text-gray-700 font-bold space-y-1">
                             <p>⚒️匠心选材，经典耐用⚒️</p>
                             <p className="font-medium text-gray-500 text-[11px]">铁艺的坚韧，防腐防锈，光线的纯净与明亮，不发黄，经久耐用</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-1">
                          <div className="flex-1 text-[12px] leading-relaxed text-gray-700 font-bold space-y-1">
                             <p>🌈全光谱之光，真实色彩尽现🌈</p>
                             <p className="font-medium text-gray-500 text-[11px]">LED全光谱灯源，显色指数大于98，享受到最接近自然光的舒适体验</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-1">
                          <div className="flex-1 text-[12px] leading-relaxed text-gray-700 font-bold space-y-1">
                             <p>📐多尺寸选择，适配无忧📐</p>
                             <p className="font-medium text-gray-500 text-[11px]">46cm至110cm多种规格，完美融入您的家居布局，提升整体空间的和谐美感</p>
                          </div>
                       </div>
                       <div className="flex items-start gap-1">
                          <div className="flex-1 text-[12px] leading-relaxed text-gray-700 font-bold space-y-1">
                             <p>📲智能操控，生活尽在掌握📲</p>
                             <p className="font-medium text-gray-500 text-[11px]">三色分段控制，到智能语音的便捷（支持米家/智能精灵系统）</p>
                          </div>
                       </div>
                    </div>
                    <div className="bg-gray-50 px-3 py-2 border-t border-gray-100 flex items-center justify-between">
                       <span className="text-[10px] text-gray-400 font-bold">商详/聊天/采纳/全店</span>
                       <Flag size={12} className="text-gray-300" />
                    </div>
                 </div>
              </div>

              {/* 卡片 2: 客服Agent 1 */}
              <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2">
                 <div className="flex items-center gap-2">
                    <div className="bg-emerald-500 text-white rounded w-5 h-5 flex items-center justify-center text-[10px] font-black shadow-sm">2</div>
                    <span className="text-[12px] font-black text-emerald-600">客服Agent</span>
                    <span className="text-[11px] text-gray-300 font-medium ml-1">11:18</span>
                    <div className="flex-1 border-b border-gray-200 border-dashed" />
                    <CornerDownRight size={12} className="text-gray-300" />
                    <button className="text-[11px] font-bold text-gray-400 border border-gray-200 px-2 py-0.5 rounded-md flex items-center gap-1 hover:bg-gray-100"><Send size={10} /> 已发送</button>
                 </div>
                 <div className="bg-white rounded-[1.25rem] border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-4 space-y-3">
                       <div className="text-[13px] font-black text-gray-800">买家：好的呢</div>
                       <div className="flex items-center gap-1.5 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                          <RefreshCw size={10} className="text-blue-500 animate-spin-slow" />
                          <span className="text-[11px] text-gray-500 font-bold">买家回应已收到，等待进一步服务</span>
                       </div>
                       <div className="flex items-center gap-1 bg-[#f9f9f9] border border-gray-100 rounded-lg p-2.5">
                          <span className="text-[11px] font-black text-emerald-600 mr-2">2.</span>
                          <span className="text-[15px]">🌹🌹</span>
                       </div>
                    </div>
                    <div className="bg-gray-50 px-3 py-2 border-t border-gray-100 flex items-center justify-between">
                       <span className="text-[10px] text-gray-400 font-bold">采纳/全店</span>
                       <Flag size={12} className="text-gray-300" />
                    </div>
                 </div>
              </div>

              {/* 卡片 3: 客服Agent 2 */}
              <div className="space-y-1.5 animate-in fade-in slide-in-from-bottom-2">
                 <div className="flex items-center gap-2">
                    <div className="bg-emerald-500 text-white rounded w-5 h-5 flex items-center justify-center text-[10px] font-black shadow-sm">3</div>
                    <span className="text-[12px] font-black text-emerald-600">客服Agent</span>
                    <span className="text-[11px] text-gray-300 font-medium ml-1">1月14日</span>
                    <div className="flex-1 border-b border-gray-200 border-dashed" />
                    <div className="relative group/verify-pill">
                       <div className="bg-[#0052d9] rounded-full px-2 py-1.5 flex items-center gap-1.5 shadow-lg shadow-blue-100 cursor-pointer active:scale-95 transition-transform">
                          <ArrowDown size={14} className="text-white bg-blue-400 rounded-full p-0.5" />
                          <Zap size={14} className="text-white" fill="currentColor" />
                          <button className="bg-blue-300/30 text-white rounded px-1 text-[10px] font-black">催</button>
                          <Send size={12} className="text-white ml-0.5" />
                       </div>
                    </div>
                 </div>
                 <div className="bg-white rounded-[1.25rem] border border-gray-200 overflow-hidden shadow-sm">
                    <div className="p-4 space-y-3">
                       <div className="text-[13px] font-black text-gray-800">买家：你好</div>
                       <div className="flex items-center gap-1.5 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
                          <RefreshCw size={10} className="text-blue-500" />
                          <span className="text-[11px] text-gray-500 font-bold">买家问候并确认沟通状态，未明确新意图</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
         </div>
       );
    }

    if (phase === 'SCANNING') {
      return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white min-h-0">
          <RefreshCw size={36} className="text-[#0052d9] animate-spin mb-4" />
          <p className="text-sm font-black text-gray-700">正在分析链路...</p>
        </div>
      );
    }

    if (phase === 'DIAGNOSTIC') {
      return (
        <div className="flex-1 flex flex-col bg-[#f8f9fa] relative overflow-hidden min-h-0">
          {renderDiagnosticList()}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] z-20 flex flex-col items-center">
             <button 
               onClick={handleInlineVerify}
               className={`w-full py-3.5 rounded-xl text-[14px] font-black shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all ${
                 inlineVerifyStatus === 'loading' ? 'bg-blue-400 cursor-not-allowed text-white shadow-none' : 
                 inlineVerifyStatus === 'error' ? 'bg-[#ff4d4f] text-white shadow-red-100' :
                 'bg-[#0052d9] hover:bg-blue-700 text-white shadow-blue-100'
               }`}
             >
               {inlineVerifyStatus === 'loading' ? (
                 <>正在验证中... <RefreshCw size={14} className="animate-spin" /></>
               ) : inlineVerifyStatus === 'error' ? (
                 <>验证失败,重新排查后点击重试 <AlertTriangle size={14} /></>
               ) : (
                 <>我已排查，立即验证 <ArrowRight size={14} /></>
               )}
             </button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-[360px] h-[720px] bg-white shadow-2xl rounded-[32px] overflow-hidden flex flex-col border border-gray-200 shrink-0 relative transition-all duration-500">
      {previewImage && (
        <div className="absolute inset-0 bg-black/85 z-[100] flex flex-col items-center justify-center p-6 animate-in fade-in duration-200" onClick={() => setPreviewImage(null)}>
          <div className="bg-white rounded-2xl p-4 w-full aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
             <div className="absolute top-3 right-3 p-1.5 bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 cursor-pointer shadow-sm" onClick={() => setPreviewImage(null)}><X size={16} /></div>
             <div className="w-full h-full flex flex-col items-center justify-center">
                {previewImage === '面板设置项核对' ? (
                  <div className="w-full px-2 space-y-2"><div className="bg-white rounded-xl border-2 border-red-500/30 p-3 shadow-md space-y-2"><div className="flex items-center justify-between"><span className="text-[12px] font-black text-gray-900">自研服务</span><div className="w-8 h-4 bg-[#0052d9] rounded-full relative"><div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" /></div></div><div className="flex items-center gap-2 pl-2"><div className="w-3 h-3 bg-[#0052d9] rounded-full flex items-center justify-center"><div className="w-1 h-1 bg-white rounded-full" /></div><span className="text-[11px] text-gray-900 font-black">新综合面板测试</span></div></div></div>
                ) : previewImage === '对话框工具栏按钮示意图' ? (
                  <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex items-center justify-center gap-6"><div className="p-3 border-2 border-[#ff4d4f] rounded-xl bg-[#fff1f0]"><CustomerServiceRobotIcon className="w-12 h-12" /></div><div className="text-gray-300"><Layout size={32} /></div></div>
                ) : previewImage === '滚动到底部激活面板指引' ? (
                   <div className="w-full h-full p-4 flex flex-col items-center"><div className="w-full flex-1 border border-gray-100 rounded-xl overflow-hidden flex flex-col bg-gray-50"><div className="h-4 bg-gray-200 w-full mb-2" /><div className="flex-1 space-y-2 p-2 overflow-hidden">{[1,2,3,4,5,6].map(i => (<div key={i} className="h-4 bg-white border border-gray-100 rounded shadow-sm flex items-center px-2 gap-2"><div className="w-2 h-2 bg-gray-100 rounded" /><div className="h-1 bg-gray-100 w-2/3 rounded" /></div>))}</div><div className="p-3 bg-white border-t border-blue-100 flex items-center justify-center flex-col gap-2"><ArrowDown className="text-blue-500 animate-bounce" size={24} /><div className="w-full h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg shadow-blue-100">显示自研侧边栏面板</div></div></div><p className="mt-3 text-[12px] font-bold text-gray-400">请滚动千牛应用列表至最底部激活开关</p></div>
                ) : (<p className="text-gray-400 text-sm font-bold">暂无详细预览</p>)}
             </div>
          </div>
        </div>
      )}

      {/* 顶部状态栏 */}
      <div className="bg-[#0052d9] px-3 py-3.5 flex items-center shrink-0 z-20 shadow-md">
        <div className="flex items-center flex-1 min-w-0 mr-1.5">
          <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden shrink-0"><QianniuLogoIcon className="w-6 h-6" /></div>
          <span className="text-white text-[14px] font-black leading-none ml-2 truncate min-w-0">hjiash:wanting</span>
          <div className="flex items-center gap-1 bg-[#003da8] rounded-full px-1.5 py-0.5 ml-1.5 border border-white/10 shrink-0">
             <div className="w-3 h-3 bg-blue-400 rounded-full flex items-center justify-center text-[7px] font-black text-white italic">T</div>
             <span className="text-white text-[10px] font-black">896</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 text-white/90 shrink-0"><Settings size={16} className="cursor-pointer" /><div className="h-3 w-[1px] bg-white/20" /><div className="w-4 h-4 border border-white border-t-0 rounded-b-full flex items-center justify-center relative scale-75"><div className="w-1 h-1 bg-white rounded-full absolute -top-1" /></div><X size={18} className="cursor-pointer" /></div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-100 shrink-0 z-10 px-1">
        {['智能体', '智能工单', '画像', '素材'].map(tab => (
          <button key={tab} className={`flex-1 py-3 text-[14px] font-black relative ${tab === '智能体' ? 'text-[#0052d9]' : 'text-gray-400'}`}>
            {tab}
            {tab === '智能体' && <div className="absolute bottom-0 left-[35%] right-[35%] h-[2.5px] bg-[#0052d9] rounded-t-full" />}
          </button>
        ))}
      </div>

      {renderContent()}

      {!isVerified && (
        <div className="px-5 py-2.5 bg-white border-t border-gray-100 flex justify-between items-center shrink-0 z-20">
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /><span className="text-[5px] text-gray-400 font-black tracking-widest">prd说明</span></div>
          <div className="flex items-center gap-1 text-gray-400"><UserCheck size={10} /><span className="text-[8px] font-bold">wanting</span></div>
        </div>
      )}
    </div>
  );
};

export default QianniuPluginPrototype;
