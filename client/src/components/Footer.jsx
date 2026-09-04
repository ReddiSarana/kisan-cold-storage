import React from 'react';
import { Snowflake, ShieldCheck, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { setActiveTab } = useApp();
  const { currentLanguage, setIsLanguageModalOpen, t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Snowflake className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">Agro<span className="text-emerald-400">Vault</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering Indian farmers with real-time cold room discovery, transparent tariffs, priority gate queue tokens, and digital warehouse receipts for credit access.
            </p>
            <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>WDRA Act 2007 Compliant Infrastructure</span>
            </div>

            {/* Language Selector Button in Footer */}
            <div className="pt-2">
              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition"
              >
                <Globe className="w-4 h-4 text-emerald-400" />
                <span>Language: <strong className="text-emerald-300">{currentLanguage.native}</strong> ({currentLanguage.name})</span>
                <span className="text-emerald-400 text-[10px] underline ml-1">Change</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform Features</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveTab('crops')} className="hover:text-emerald-400 transition">Crops Cold Storage Guidelines</button></li>
              <li><button onClick={() => setActiveTab('units')} className="hover:text-emerald-400 transition">Find & Book Cold Storage Units</button></li>
              <li><button onClick={() => setActiveTab('queue')} className="hover:text-emerald-400 transition">Live Gate & Weighbridge Queue</button></li>
              <li><button onClick={() => setActiveTab('tracking')} className="hover:text-emerald-400 transition">Procurement & Consignment Tracker</button></li>
              <li><button onClick={() => setActiveTab('documents')} className="hover:text-emerald-400 transition">Docx Agreement & e-NWR Generator</button></li>
              <li><button onClick={() => setActiveTab('sms')} className="hover:text-emerald-400 transition">SMS Dispatch & Alert Center</button></li>
            </ul>
          </div>

          {/* Col 3: Supported Produce */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Popular Telangana Crops</h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['Dry Red Chilli (మిరప)', 'Nizamabad Turmeric (పసుపు)', 'Hybrid Seed Paddy (వరి విత్తనాలు)', 'Tandur Red Gram (కందులు)', 'Banganapalli Mango (మామిడి)', 'Sweet Orange (బత్తాయి)', 'Cotton Seeds (పత్తి)', 'Tomato (టమాటా)'].map((crop, i) => (
                <span key={i} className="bg-slate-800 text-slate-300 px-2 py-1 rounded border border-slate-700">
                  {crop}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 pt-2">
              Chamber temperatures calibrated to prevent shrinkage, sprouting, and chilling injury.
            </p>
          </div>

          {/* Col 4: Farmer Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">24/7 Kisan Support</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Toll-Free Helpline: <strong>1800-180-1551</strong></span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>support@agrovault.in</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>APMC Cold Chain Corridor, Krishi Bhawan, New Delhi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2026 AgroVault. Designed for Indian Farmers & Post-Harvest Cold Chains.</p>
          <div className="flex space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Bailment</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">WDRA Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
