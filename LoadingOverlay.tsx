
import React, { useState, useEffect } from 'react';

const LOADING_PHASES = [
  { title: "تحليل مدخلات التحدي", sub: "تفكيك المشكلة وتحديد المتغيرات الأساسية" },
  { title: "اختيار المنهجية الأنسب", sub: "المفاضلة بين ٢٣ تقنية ابتكار عالمية" },
  { title: "توليد الحلول الإبداعية", sub: "صياغة أفكار غير تقليدية قابلة للتطبيق" },
  { title: "تقييم الجدوى والمخاطر", sub: "دراسة العقبات المحتملة واقتراح طرق معالجتها" },
  { title: "تنسيق مصفوفة الحل النهائي", sub: "تجهيز التوصيات الاستراتيجية وخطة العمل" }
];

export const LoadingOverlay: React.FC = () => {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // تقليب المراحل بناءً على وقت المعالجة المتوقع
    const phaseInterval = setInterval(() => {
      setPhaseIdx((prev) => (prev < LOADING_PHASES.length - 1 ? prev + 1 : prev));
    }, 4500);

    // شريط التقدم يتحرك بشكل انسيابي غير خطي ليعطي شعوراً بالمعالجة الحقيقية
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 30) return prev + 0.8;
        if (prev < 70) return prev + 0.4;
        if (prev < 95) return prev + 0.2;
        return prev;
      });
    }, 100);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
      {/* Background with a more technical mesh/grid feel */}
      <div className="absolute inset-0 bg-white/95 backdrop-blur-3xl animate-in fade-in duration-700">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>
      
      <div className="relative max-w-lg w-full text-center space-y-12 md:space-y-16 animate-in zoom-in-95 duration-700">
        
        {/* Animated Lab Icon */}
        <div className="relative mx-auto w-28 h-28 md:w-36 md:h-36">
          <div className="absolute inset-0 bg-indigo-500/10 rounded-[2.5rem] animate-pulse"></div>
          <div className="absolute inset-0 border-2 border-indigo-100 rounded-[2.5rem] animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute inset-0 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl border border-white/10 transform transition-transform hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="md:w-16 md:h-16">
              <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A4.5 4.5 0 0 0 13.5 3.5c-1.3 0-2.6.5-3.5 1.5-.8.8-1.5 1.5-2.5 1.5H5v14h14v-2.5a1 1 0 0 0-1-1h-3z"/>
              <path d="M9 18h6"/>
              <path d="M10 22h4"/>
            </svg>
          </div>
        </div>

        {/* Phase Text with Smooth Transitions */}
        <div className="space-y-4 px-4 min-h-[120px] flex flex-col justify-center">
          <h3 className="text-2xl md:text-4xl font-black text-slate-900 transition-all duration-500 transform">
            {LOADING_PHASES[phaseIdx].title}
          </h3>
          <p className="text-indigo-600 font-bold text-base md:text-xl mt-2 tracking-wide opacity-80">
            {LOADING_PHASES[phaseIdx].sub}
          </p>
        </div>

        {/* Professional Progress Section */}
        <div className="space-y-6 px-8 md:px-12">
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5 relative">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(79,70,229,0.4)] shimmer-wave"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
               <span className="text-indigo-600 font-black text-sm md:text-base">{Math.floor(progress)}%</span>
            </div>
            <span>جاري معالجة البيانات</span>
          </div>
        </div>

        {/* Professional Note */}
        <div className="pt-4">
          <p className="text-slate-400 text-xs md:text-sm font-bold leading-relaxed max-w-xs mx-auto px-6 opacity-70">
            يتم الآن تطبيق منهجيات التفكير التصميمي والتحليل الاستراتيجي لضمان دقة الحلول المقترحة.
          </p>
        </div>

      </div>
    </div>
  );
};
