
import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Settings, 
  Bell, 
  ChevronDown, 
  Activity, 
  Wifi, 
  WifiOff, 
  Power, 
  Zap, 
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Search,
  MousePointer2,
  List
} from 'lucide-react';
import { Shop, ModalMode, TabType } from './types';
import ServiceStatusGroupMonitor from './components/ServiceStatusGroupMonitor';

const INITIAL_SHOPS: Shop[] = [
  { id: '1', name: '旗舰店 - 官方直营', status: 'connected', serviceEnabled: true },
  { id: '2', name: '潮流男装分店', status: 'disconnected', serviceEnabled: false }, // 类型A: 服务没开
  { id: '3', name: '美妆个护店', status: 'disconnected', serviceEnabled: true },  // 类型B: 面板没连
  { id: '4', name: '运动户外工厂店', status: 'connected', serviceEnabled: true },
  { id: '5', name: '数码极客优选', status: 'disconnected', serviceEnabled: true },  // 类型B: 面板没连
  { id: '6', name: '精品女装店', status: 'disconnected', serviceEnabled: true },
  { id: '7', name: '儿童玩具专营', status: 'disconnected', serviceEnabled: false },
  { id: '8', name: '生鲜超市', status: 'connected', serviceEnabled: true },
  { id: '9', name: '进口食品馆', status: 'disconnected', serviceEnabled: true },
];

const App: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>(INITIAL_SHOPS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const exceptionsCount = useMemo(() => 
    shops.filter(s => !s.serviceEnabled || s.status === 'disconnected').length,
  [shops]);

  const updateShop = (id: string, updates: Partial<Shop>) => {
    setShops(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 22V9C10 6.79086 8.20914 5 6 5H2" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
              <rect x="14" y="5" width="5" height="5" rx="1" fill="white"/>
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-gray-800 tracking-tight text-lg">探域科技</h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-gray-600">
            <Settings size={20} />
          </button>
          <div className="relative">
            <Bell size={20} className="text-gray-400" />
            {exceptionsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full">
                {exceptionsCount}
              </span>
            )}
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
            <img src="https://picsum.photos/32/32?random=1" alt="avatar" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* Global Alert Banner */}
        {exceptionsCount > 0 && (
          <div className="mb-6 bg-red-600 rounded-2xl p-5 shadow-lg shadow-red-200 text-white flex items-center justify-between animate-in fade-in slide-in-from-top-4">
            <div className="flex items-start gap-4 flex-1 mr-8">
              <div className="bg-white/20 p-2 rounded-full shrink-0 mt-1">
                <ShieldAlert size={24} className="text-white" />
              </div>
              <div>
                <h2 className="font-bold text-base leading-tight mb-2">
                  为响应淘宝平台数据安全要求，淘宝平台店铺需要调整产品使用方式，整改后功能存在差异，限期内未完成调整的店铺将无法正常接待。
                </h2>
                <p className="text-red-100 text-xs opacity-90">
                  需要您仔细阅读通知并且根据通知内容完成淘宝店铺相关调整。
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-red-600 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-50 transition-colors shadow-sm whitespace-nowrap"
                >
                  需调整的店铺
                </button>
                <button className="text-white text-sm hover:underline underline-offset-4 whitespace-nowrap">
                  查看通知详情
                </button>
            </div>
          </div>
        )}

        {/* Dashboard Content Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-400"><Activity size={24} /></div>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded">在线</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">98.2%</h3>
            <p className="text-gray-500 text-sm">平均服务响应率</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-400"><LayoutDashboard size={24} /></div>
              <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">稳定</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">1,240</h3>
            <p className="text-gray-500 text-sm">今日总接待人次</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className={`text-gray-400 ${exceptionsCount > 0 ? 'text-red-500' : ''}`}><ShieldAlert size={24} /></div>
              <span className={`text-xs font-bold px-2 py-1 rounded ${exceptionsCount > 0 ? 'text-red-500 bg-red-50' : 'text-green-500 bg-green-50'}`}>
                {exceptionsCount > 0 ? '存在异常' : '健康'}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{shops.length - exceptionsCount} / {shops.length}</h3>
            <p className="text-gray-500 text-sm">连接正常店铺</p>
          </div>
        </div>

        {/* Shop List */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">店铺列表</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索店铺名称..." 
                  className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">店铺名称</th>
                  <th className="px-6 py-4">SaaS服务开关</th>
                  <th className="px-6 py-4">千牛插件连接</th>
                  <th className="px-6 py-4">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {shops.map(shop => (
                  <tr key={shop.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">{shop.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {shop.serviceEnabled ? (
                          <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                            <CheckCircle2 size={14} /> 已开启
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-orange-500 text-sm font-medium">
                            <Power size={14} /> 未开启
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {shop.status === 'connected' ? (
                          <span className="flex items-center gap-1.5 text-blue-600 text-sm font-medium">
                            <Zap size={14} /> 已连接
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-red-500 text-sm font-medium">
                            <WifiOff size={14} /> 断开连接
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-600 text-sm font-semibold hover:text-blue-700 underline underline-offset-4"
                      >
                        诊断连接
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Diagnosis Modal */}
      {isModalOpen && (
        <ServiceStatusGroupMonitor 
          shops={shops} 
          onUpdateShop={updateShop} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;
