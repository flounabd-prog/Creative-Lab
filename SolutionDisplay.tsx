
import React, { useState } from 'react';
import { CreativeSolution } from './types.ts';

interface SolutionDisplayProps {
  solution: CreativeSolution;
  problem: string;
}

const CATEGORY_STYLES = {
  analytical: { 
    primary: "bg-indigo-600", 
    secondary: "bg-indigo-50", 
    text: "text-indigo-600",
    border: "border-indigo-100",
    gradient: "from-indigo-600 to-indigo-800",
    label: "تحليلية"
  },
  generative: { 
    primary: "bg-cyan-600", 
    secondary: "bg-cyan-50", 
    text: "text-cyan-600",
    border: "border-cyan-100",
    gradient: "from-cyan-600 to-cyan-800",
    label: "توليدية"
  },
  strategic: { 
    primary: "bg-purple-600", 
    secondary: "bg-purple-50", 
    text: "text-purple-600",
    border: "border-purple-100",
    gradient: "from-purple-600 to-purple-800",
    label: "استراتيجية"
  }
};

export const SolutionDisplay: React.FC<SolutionDisplayProps> = ({ solution, problem }) => {
  const [activeTab, setActiveTab] = useState<'ideas' | 'steps' | 'logic' | 'dashboard'>('ideas');
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);
  
  const style = CATEGORY_STYLES[solution.techniqueCategory] || CATEGORY_STYLES.analytical;

  const toggleStep = (idx: number) => {
    const next = new Set(completed);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    setCompleted(next);
  };

  const handleCopy = async () => {
    const textToCopy = `
🌟 مختبر الإبداع - تقرير الحل المبتكر 🌟

التحدي: ${problem}
تصنيف التحدي: ${solution.problemClassification}
المنهجية: ${solution.techniqueName} (${style.label})

فلسفة الحل:
${solution.techniqueDescription}

أهم الأفكار المبتكرة:
${solution.innovativeIdeas.map((idea, i) => `💡 فكرة ${i + 1}: ${idea.title}\n   الوصف: ${idea.description}\n   درجة الأثر: ${idea.impactScore}/10`).join('\n\n')}

تحليل الجدوى:
${solution.feasibilityAnalysis}

خطة العمل التنفيذية:
${solution.steps.map((step, i) => `📍 خطوة ${i + 1}: ${step.title}\n   التفاصيل: ${step.content}`).join('\n\n')}

الأثر المتوقع:
${solution.expectedImpact}

التوصية النهائية:
${solution.finalRecommendation}
    `.trim();

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('فشل النسخ', err);
    }
  };

  const handleExportPDF = () => {
    const originalTitle = document.title;
    document.title = `تقرير_مختبر_الإبداع_${solution.techniqueName.replace(/\s+/g, '_')}`;
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="w-full space-y-6 md:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header Section */}
      <section className={`no-print bg-white rounded-[2rem] md:rounded-[4rem] border ${style.border} p-6 md:p-16 shadow-2xl relative overflow-hidden`}>
        <div className={`absolute top-0 right-0 w-48 h-48 md:w-[600px] md:h-[600px] ${style.secondary} opacity-40 rounded-bl-full -z-0 translate-x-1/4 -translate-y-1/4`}></div>
        <div className="relative z-10 space-y-4 md:space-y-8 text-right">
          <div className="flex items-center justify-between gap-4">
             <div className="flex flex-wrap items-center gap-2">
               <span className={`px-3 py-1 md:px-5 md:py-2 ${style.primary} text-white text-[10px] md:text-sm font-black rounded-full uppercase tracking-widest shadow-md`}>
                 {style.label}
               </span>
               <span className="text-[10px] md:text-sm font-black text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                 {solution.problemClassification}
               </span>
             </div>
             <div className="flex gap-2">
               <button 
                 onClick={handleExportPDF} 
                 className="p-3 md:p-4 rounded-xl transition-all flex items-center gap-2 font-black text-xs md:text-base bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 active:scale-95"
                 title="تحميل كتقرير PDF"
               >
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                 <span className="hidden md:block">تقرير PDF</span>
               </button>
               <button 
                 onClick={handleCopy} 
                 className={`p-3 md:p-4 rounded-xl transition-all flex items-center gap-2 font-black text-xs md:text-base ${copied ? 'bg-green-500 text-white' : 'bg-slate-900 text-white shadow-lg'}`}
               >
                 {copied ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>}
                 <span className="hidden md:block">{copied ? 'تم النسخ' : 'نسخ'}</span>
               </button>
             </div>
          </div>
          
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-3xl md:text-8xl font-black text-slate-900 tracking-tight leading-none">
              {solution.techniqueName}
            </h2>
            <div className={`border-r-4 md:border-r-[12px] ${style.primary.replace('bg-', 'border-')} pr-4 md:pr-8 py-3 md:py-6 bg-white/50 backdrop-blur-sm rounded-l-xl md:rounded-l-[2rem]`}>
               <p className="text-base md:text-4xl font-black text-slate-700 leading-tight">"{problem}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <nav className="no-print flex bg-white/95 backdrop-blur-2xl p-1.5 md:p-2.5 rounded-2xl md:rounded-[2.5rem] w-full max-w-2xl mx-auto sticky top-2 md:top-24 z-40 border border-slate-200 shadow-xl overflow-x-auto no-scrollbar">
        {[
          { id: 'ideas', label: 'الحلول المبتكرة' },
          { id: 'steps', label: 'خارطة التنفيذ' },
          { id: 'logic', label: 'التحليل الاستراتيجي' },
          { id: 'dashboard', label: 'قياس الأثر' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center py-3 md:py-4 px-3 md:px-8 rounded-xl md:rounded-[1.8rem] font-black text-xs md:text-lg transition-all whitespace-nowrap ${
              activeTab === tab.id ? `${style.primary} text-white shadow-md` : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <div className="no-print min-h-[400px] pb-20 px-1">
        {activeTab === 'ideas' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Feasibility Intro Card */}
            <div className="bg-indigo-50 border-2 border-indigo-100 p-8 rounded-[2rem] md:rounded-[3rem] text-right">
              <h3 className="text-lg md:text-2xl font-black text-indigo-900 mb-3 flex items-center justify-end gap-3">
                تحليل جدوى الحلول
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-indigo-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </h3>
              <p className="text-sm md:text-xl font-bold text-indigo-700/80 leading-relaxed">{solution.feasibilityAnalysis}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {solution.innovativeIdeas.map((idea, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${style.gradient} p-6 md:p-14 rounded-[2rem] md:rounded-[3.5rem] text-white shadow-xl relative overflow-hidden flex flex-col group`}>
                  <div className="absolute top-0 left-0 w-full h-full bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                  <div className="relative z-10 flex flex-col h-full space-y-4 md:space-y-8 text-right">
                    <div className="flex justify-between items-center">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-white/20 flex items-center justify-center font-black text-lg md:text-2xl backdrop-blur-md">0{idx + 1}</div>
                      <span className="text-[10px] md:text-sm font-black bg-white/20 px-3 py-1 rounded-full uppercase backdrop-blur-md">أثر: {idea.impactScore}/10</span>
                    </div>
                    <h4 className="text-xl md:text-4xl font-black leading-tight">{idea.title}</h4>
                    <p className="text-sm md:text-xl font-bold text-white/90 leading-relaxed flex-grow">{idea.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'steps' && (
          <div className="max-w-4xl mx-auto space-y-4 animate-in fade-in duration-500">
            {solution.steps.map((step, idx) => (
              <div 
                key={idx} 
                onClick={() => toggleStep(idx)}
                className={`flex gap-4 md:gap-8 p-6 md:p-10 rounded-2xl md:rounded-[3rem] border-2 transition-all cursor-pointer ${
                  completed.has(idx) ? 'bg-slate-50 border-slate-100 opacity-50' : `bg-white ${style.border} shadow-lg hover:border-indigo-300`
                }`}
              >
                <div className={`w-12 h-12 md:w-20 md:h-20 rounded-2xl md:rounded-[2rem] flex items-center justify-center font-black text-xl md:text-4xl shrink-0 ${
                  completed.has(idx) ? 'bg-slate-200 text-slate-400' : `${style.primary} text-white shadow-xl`
                }`}>
                  {completed.has(idx) ? '✓' : idx + 1}
                </div>
                <div className="space-y-2 md:space-y-4 text-right flex-grow">
                  <h4 className={`text-xl md:text-4xl font-black ${completed.has(idx) ? 'line-through text-slate-400' : 'text-slate-900'}`}>{step.title}</h4>
                  <p className="text-slate-600 text-sm md:text-2xl font-bold leading-relaxed">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'logic' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 animate-in fade-in duration-500">
            <div className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[4rem] border border-slate-100 shadow-xl space-y-4 md:space-y-8 text-right">
               <div className={`w-12 h-12 md:w-20 md:h-20 ${style.secondary} ${style.text} rounded-xl md:rounded-[2rem] flex items-center justify-center`}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="md:w-10 md:h-10"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
               </div>
               <div className="space-y-2">
                 <h3 className="text-xl md:text-4xl font-black text-slate-900">تبرير المنهجية</h3>
                 <p className="text-sm md:text-xl font-bold text-slate-500 italic">"لماذا تم اختيار هذه التقنية تحديداً لهذا التحدي؟"</p>
               </div>
               <p className="text-base md:text-2xl font-black text-slate-800 leading-relaxed border-r-4 border-indigo-600 pr-4">{solution.whyChosen}</p>
            </div>
            
            <div className="bg-slate-900 p-8 md:p-12 rounded-[2rem] md:rounded-[4rem] text-white shadow-2xl space-y-4 md:space-y-8 text-right">
               <div className="w-12 h-12 md:w-20 md:h-20 bg-white/10 rounded-xl md:rounded-[2rem] flex items-center justify-center backdrop-blur-md">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="md:w-10 md:h-10 text-indigo-400"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
               </div>
               <h3 className="text-xl md:text-4xl font-black">الأساس الفلسفي</h3>
               <p className="text-sm md:text-2xl font-bold text-slate-300 leading-relaxed border-r-4 border-white/20 pr-4 italic">"{solution.techniqueDescription}"</p>
            </div>
            
            <div className="md:col-span-2 bg-red-50 p-8 md:p-12 rounded-[2rem] md:rounded-[4rem] border border-red-100 text-right space-y-6 md:space-y-8">
               <div className="space-y-2">
                 <h3 className="text-xl md:text-4xl font-black text-red-900 flex items-center justify-end gap-3">
                   إدارة المخاطر والتحصين
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-red-600 md:w-10 md:h-10"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                 </h3>
                 <p className="text-xs md:text-xl font-bold text-red-700/70">توقع العقبات قبل حدوثها ووضع بروتوكولات المواجهة</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                 {solution.riskAssessment.map((item, idx) => (
                   <div key={idx} className="bg-white p-6 md:p-10 rounded-2xl md:rounded-[3rem] space-y-4 shadow-sm border border-red-100/50">
                     <div className="flex items-center gap-2 justify-end">
                       <p className="font-black text-red-700 text-base md:text-2xl">التحدي المتوقع</p>
                       <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                     </div>
                     <p className="text-slate-800 font-bold text-sm md:text-xl bg-red-50/50 p-4 rounded-xl">{item.risk}</p>
                     <div className="pt-4 border-t border-slate-50">
                        <p className="font-black text-green-700 text-sm md:text-xl mb-2">استراتيجية المواجهة:</p>
                        <p className="text-slate-600 font-bold text-xs md:text-lg">{item.mitigation}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="max-w-5xl mx-auto space-y-6 md:space-y-10 animate-in fade-in duration-500">
             <div className={`p-10 md:p-24 rounded-[3rem] md:rounded-[5rem] text-white shadow-2xl ${style.primary} text-right space-y-6 md:space-y-10 relative overflow-hidden group`}>
                <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-xs md:text-xl font-black uppercase tracking-widest opacity-70">الأثر الاستراتيجي المستهدف</h3>
                <p className="text-2xl md:text-7xl font-black leading-tight tracking-tight border-r-8 border-white/20 pr-6">"{solution.expectedImpact}"</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div className="bg-white p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] border border-slate-100 shadow-xl text-right space-y-6">
                   <h4 className="font-black text-indigo-600 text-xs md:text-xl uppercase tracking-widest">توصية الخبير الختامية</h4>
                   <p className="text-xl md:text-4xl font-black text-slate-800 leading-tight">"{solution.finalRecommendation}"</p>
                </div>
                <div className="bg-slate-900 p-8 md:p-16 rounded-[2rem] md:rounded-[4rem] border border-slate-800 shadow-2xl text-right space-y-8">
                   <h4 className="font-black text-indigo-400 text-xs md:text-xl uppercase tracking-widest">إجراءات البدء الفوري</h4>
                   <div className="space-y-4">
                      {solution.suggestedActionItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-end gap-4 group/item">
                          <span className="font-black text-white text-base md:text-2xl transition-transform group-hover/item:-translate-x-2">{item}</span>
                          <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${style.primary} shadow-[0_0_15px_rgba(79,70,229,0.6)]`}></div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>

      {/* Print-Only Layout */}
      <div className="print-only text-right space-y-12">
        <div className="border-b-8 border-indigo-600 pb-8 mb-12 flex justify-between items-end">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900">تقرير الحل الابتكاري التخصصي</h1>
            <p className="text-indigo-600 font-bold">مختبر الإبداع الرقمي - Creative Lab v2.5</p>
          </div>
          <div className="text-left font-bold text-slate-400 text-sm">تاريخ التقرير: {new Date().toLocaleDateString('ar-SA')}</div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <section className="space-y-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">التحدي القائم</h2>
            <div className="p-6 bg-slate-50 border-r-8 border-slate-900 rounded-l-2xl h-full flex items-center">
              <p className="text-2xl font-black text-slate-800">"{problem}"</p>
            </div>
          </section>
          <section className="space-y-4">
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">تصنيف التحدي</h2>
            <div className="p-6 bg-indigo-50 border-r-8 border-indigo-600 rounded-l-2xl h-full flex items-center">
              <p className="text-2xl font-black text-indigo-700">{solution.problemClassification}</p>
            </div>
          </section>
        </div>

        <section className="space-y-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">المنهجية ومنطق الاختيار</h2>
          <div className="space-y-4">
            <h3 className="text-3xl font-black text-indigo-700">{solution.techniqueName}</h3>
            <p className="text-lg text-slate-800 leading-relaxed font-bold bg-slate-50 p-6 rounded-2xl border border-slate-200">
               <span className="text-indigo-600">لماذا هذه التقنية: </span> {solution.whyChosen}
            </p>
          </div>
        </section>

        <section className="space-y-4 pt-6">
           <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">تحليل الجدوى</h2>
           <p className="text-xl font-bold text-slate-700 leading-relaxed">{solution.feasibilityAnalysis}</p>
        </section>

        <section className="space-y-6 pt-6 border-t border-slate-100">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">مصفوفة الحلول المقترحة</h2>
          <div className="grid grid-cols-1 gap-4">
            {solution.innovativeIdeas.map((idea, idx) => (
              <div key={idx} className="p-6 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                   <h4 className="text-xl font-black text-slate-900">الحل المبتكر ٠{idx + 1} - {idea.title}</h4>
                   <span className="text-sm font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">الأثر: {idea.impactScore}/10</span>
                </div>
                <p className="text-slate-600 font-bold leading-relaxed">{idea.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 pt-6 border-t border-slate-100 print-break">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">خارطة الطريق التنفيذية</h2>
          <div className="space-y-6">
            {solution.steps.map((step, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl border-2 border-slate-900 text-slate-900 flex items-center justify-center font-black shrink-0 text-xl">{idx + 1}</div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-slate-900">{step.title}</h4>
                  <p className="text-slate-600 font-bold text-lg">{step.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6 pt-6 border-t border-slate-100">
           <div className="grid grid-cols-2 gap-8 bg-slate-900 text-white p-10 rounded-[3rem]">
              <div className="space-y-4">
                 <h2 className="text-xs font-black text-indigo-400 uppercase tracking-widest">التوصية النهائية</h2>
                 <p className="text-2xl font-black leading-tight border-r-4 border-indigo-500 pr-4">{solution.finalRecommendation}</p>
              </div>
              <div className="space-y-4">
                 <h2 className="text-xs font-black text-indigo-400 uppercase tracking-widest">الأثر الاستراتيجي</h2>
                 <p className="text-2xl font-black leading-tight border-r-4 border-indigo-500 pr-4">{solution.expectedImpact}</p>
              </div>
           </div>
        </section>

        <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm font-bold">
           تم إنشاء هذا التقرير التحليلي بواسطة "مختبر الإبداع الرقمي" - محرك الابتكار الذكي (Gemini 3 Pro)
        </footer>
      </div>
    </div>
  );
};
