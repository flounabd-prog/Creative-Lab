
import React, { useState } from 'react';
import { CreativityTechnique } from '../types.ts';

// Define the missing props interface
interface ProblemFormProps {
  onSubmit: (problem: string) => void;
  isLoading: boolean;
}

const CATEGORIES = {
  analytical: { title: "أدوات التحليل", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
  generative: { title: "توليد الأفكار", color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-100" },
  strategic: { title: "التخطيط والقرار", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" }
};

const MINI_TECHNIQUES = [
  { name: CreativityTechnique.FIVE_WHYS, cat: 'analytical', desc: "تحليل الجذور العميقة للمشكلة عبر تكرار سؤال لماذا" },
  { name: CreativityTechnique.FIRST_PRINCIPLES, cat: 'analytical', desc: "تفكيك المشكلة إلى حقائقها الأولية وإعادة بنائها من الصفر" },
  { name: CreativityTechnique.SCAMPER, cat: 'generative', desc: "تطوير الأفكار والمنتجات عبر 7 استراتيجيات تغيير ذكية" },
  { name: CreativityTechnique.LATERAL_THINKING, cat: 'generative', desc: "التفكير الجانبي لكسر الأنماط التقليدية والوصول لحلول إبداعية" },
  { name: CreativityTechnique.BIOMIMICRY, cat: 'generative', desc: "استلهام الحلول من تصاميم الطبيعة وعملياتها الحيوية المذهلة" },
  { name: CreativityTechnique.DESIGN_THINKING, cat: 'strategic', desc: "منهجية ابتكار تركز على فهم احتياجات الإنسان وحل مشكلاته" },
  { name: CreativityTechnique.SIX_HATS, cat: 'strategic', desc: "تنظيم التفكير الجماعي وضمان شمولية التحليل من كافة الزوايا" },
];

export const ProblemForm: React.FC<ProblemFormProps> = ({ onSubmit, isLoading }) => {
  const [problem, setProblem] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (e: any) => setProblem(prev => prev + (prev ? ' ' : '') + e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <div className="w-full space-y-8 md:space-y-16">
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl shadow-indigo-100/50 border border-slate-100 overflow-hidden transform transition-transform hover:scale-[1.01]">
        <form 
          onSubmit={(e) => { e.preventDefault(); if(problem.trim()) onSubmit(problem); }} 
          className="p-6 md:p-14 space-y-6"
        >
          <div className="relative group text-right">
            <label className="block text-slate-400 font-black text-xs md:text-sm uppercase tracking-widest mb-4 mr-2">صف التحدي الذي تواجهه بوضوح</label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="مثال: كيف يمكنني زيادة المبيعات في متجري الإلكتروني بميزانية تسويق محدودة؟"
              className="w-full h-44 md:h-56 p-6 text-lg md:text-2xl border-2 border-slate-50 rounded-[1.5rem] md:rounded-[2rem] focus:border-indigo-500 transition-all resize-none bg-slate-50/30 font-bold placeholder:text-slate-300 outline-none text-right"
              dir="rtl"
            />
            <button
              type="button"
              onClick={startListening}
              className={`absolute bottom-6 left-6 p-4 rounded-2xl transition-all shadow-lg ${isListening ? 'bg-red-500 text-white animate-pulse scale-110' : 'bg-white text-slate-500 hover:bg-indigo-600 hover:text-white border border-slate-100 hover:scale-110'}`}
              title="تحدث بدلاً من الكتابة"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            </button>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !problem.trim()}
            className="w-full py-5 md:py-8 text-xl md:text-3xl font-black rounded-[1.5rem] md:rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                جاري الابتكار...
              </span>
            ) : (
              <>
                ابتكر الآن
                <svg className="w-6 h-6 md:w-8 md:h-8 transition-transform group-hover:-translate-x-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="m15 18-6-6 6-6"/></svg>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="space-y-10">
        <div className="text-center space-y-3 px-4">
          <h3 className="text-2xl md:text-4xl font-black text-slate-900">تقنيات الابتكار المعتمدة</h3>
          <p className="text-sm md:text-xl text-slate-500 font-bold opacity-75">سيقوم المحرك الذكي باختيار التقنية الأمثل لمشكلتك من بين 23 منهجية عالمية</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-6 px-2">
          {MINI_TECHNIQUES.map((tech, idx) => (
            <div 
              key={idx} 
              title={tech.desc}
              className="p-4 bg-white border border-slate-100 rounded-3xl text-center shadow-sm hover:border-indigo-200 transition-all cursor-help group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-full h-1 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${CATEGORIES[tech.cat as keyof typeof CATEGORIES].color}`}>
                {CATEGORIES[tech.cat as keyof typeof CATEGORIES].title}
              </span>
              <h5 className="font-black text-slate-800 text-xs md:text-sm mt-2">{tech.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
