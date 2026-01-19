
import React, { useState, useMemo } from 'react';
import { CreativityTechnique } from '../types.ts';

const CATEGORIES = {
  all: { title: "الكل", color: "bg-slate-900", text: "text-white" },
  analytical: { title: "أدوات التحليل", color: "bg-indigo-600", text: "text-white" },
  generative: { title: "توليد الأفكار", color: "bg-cyan-600", text: "text-white" },
  strategic: { title: "التخطيط والقرار", color: "bg-purple-600", text: "text-white" }
};

// SVG Icon mapping for each technique
const TechIcon = ({ name, className }: { name: string, className?: string }) => {
  const icons: Record<string, React.ReactNode> = {
    [CreativityTechnique.FIVE_WHYS]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v4l2 2"/></svg>,
    [CreativityTechnique.FIRST_PRINCIPLES]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M2 12h20"/><path d="M12 12 4 4m16 16L12 12m0 0 8-8M4 20l8-8"/></svg>,
    [CreativityTechnique.SCAMPER]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
    [CreativityTechnique.SIX_HATS]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 18h20M17 18V9a5 5 0 0 0-10 0v9M7 14h10"/></svg>,
    [CreativityTechnique.TRIZ]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M12 2v2M12 20v2M20 12h2M2 12h4"/></svg>,
    [CreativityTechnique.DESIGN_THINKING]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
    [CreativityTechnique.LATERAL_THINKING]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7h18M3 12h18M3 17h18"/><path d="m17 4 4 4-4 4"/></svg>,
    [CreativityTechnique.BLUE_OCEAN]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
    [CreativityTechnique.DISNEY_METHOD]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 3 1.91 5.89h6.19l-5.01 3.64 1.91 5.89L12 14.77l-5 3.65 1.91-5.89-5.01-3.64h6.19L12 3z"/></svg>,
    [CreativityTechnique.REVERSE_BRAINSTORMING]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>,
    [CreativityTechnique.LOTUS_BLOSSOM]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM12 17c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM21 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM7.05 7.05c-.78 0-1.41.63-1.41 1.41s.63 1.41 1.41 1.41 1.41-.63 1.41-1.41-.63-1.41-1.41-1.41zM16.95 16.95c-.78 0-1.41.63-1.41 1.41s.63 1.41 1.41 1.41 1.41-.63 1.41-1.41-.63-1.41-1.41-1.41zM16.95 7.05c0-.78-.63-1.41-1.41-1.41s-1.41.63-1.41 1.41.63 1.41 1.41 1.41 1.41-.63 1.41-1.41zM7.05 16.95c0-.78-.63-1.41-1.41-1.41s-1.41.63-1.41 1.41.63 1.41 1.41 1.41 1.41-.63 1.41-1.41z"/></svg>,
    [CreativityTechnique.MORPHOLOGICAL_ANALYSIS]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>,
    [CreativityTechnique.SYNECTICS]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7h-9m3 10h-9M4 7h2m14 10h2M12 4v2m0 12v2M7 12h10"/></svg>,
    [CreativityTechnique.FORCE_FIELD]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v18M5 8l-2 4 2 4M19 8l2 4-2 4"/><path d="M3 12h6M15 12h6"/></svg>,
    [CreativityTechnique.MIND_MAPPING]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 9V4M12 20v-5M15 12h5M4 12h5M18 6l-3 3M9 15l-3 3M18 18l-3-3M9 9 6 6"/></svg>,
    [CreativityTechnique.SWOT_CREATIVE]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v18H3z"/><path d="M12 3v18M3 12h18"/></svg>,
    [CreativityTechnique.RANDOM_WORD]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="8.5" r="1.5"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="12" cy="12" r="1.5"/></svg>,
    [CreativityTechnique.STORYBOARDING]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M7 4v16M17 4v16M2 9h20M2 15h20"/></svg>,
    [CreativityTechnique.EMPATHY_MAPPING]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
    [CreativityTechnique.MEDICI_EFFECT]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="12" r="6"/><circle cx="15" cy="12" r="6"/></svg>,
    [CreativityTechnique.PARALLEL_THINKING]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4h14M5 10h14M5 16h14M5 22h14"/></svg>,
    [CreativityTechnique.BIOMIMICRY]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 20a7 7 0 0 1-7-7c0-3.87 3.13-7 7-7s7 3.13 7 7a7 7 0 0 1-7 7z"/><path d="M11 13V6M11 13l4 4M11 13l-4 4"/></svg>,
    [CreativityTechnique.ANALOGICAL_THINKING]: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M3 7h18M6 21V7M18 21V7M6 12h12"/></svg>,
  };

  return <div className={className}>{icons[name] || <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>}</div>;
};

const TECHNIQUES_DATA = [
  { name: CreativityTechnique.FIVE_WHYS, cat: 'analytical', difficulty: 'سهل', time: '15 دقيقة', fullDesc: "منهجية يابانية تعتمد على تكرار سؤال 'لماذا' خمس مرات للوصول إلى الجذر الحقيقي للمشكلة.", usage: "تحليل الأعطال والمشكلات المتكررة." },
  { name: CreativityTechnique.FIRST_PRINCIPLES, cat: 'analytical', difficulty: 'متقدم', time: '60 دقيقة', fullDesc: "تفكيك المشكلة إلى حقائقها الأساسية المطلقة وإعادة بنائها من الصفر بعيداً عن القياس التقليدي.", usage: "الابتكار الجذري في النماذج الاقتصادية والتقنية." },
  { name: CreativityTechnique.SCAMPER, cat: 'generative', difficulty: 'متوسط', time: '45 دقيقة', fullDesc: "مصفوفة من 7 اتجاهات تفكير (استبدل، ادمج، كيف، عدل، استخدام آخر، احذف، اعكس) لتطوير الأفكار.", usage: "تطوير المنتجات والخدمات الحالية." },
  { name: CreativityTechnique.SIX_HATS, cat: 'strategic', difficulty: 'متوسط', time: '40 دقيقة', fullDesc: "تقسيم التفكير إلى 6 أدوار محددة (القبعات الست) لضمان شمولية التحليل واتخاذ القرار.", usage: "الاجتماعات الجماعية وحل الصراعات الفكرية." },
  { name: CreativityTechnique.TRIZ, cat: 'strategic', difficulty: 'خبير', time: '120 دقيقة', fullDesc: "نظرية حل المشكلات الابتكارية، تعتمد على قوانين التطور التقني و40 مبدأ ابتكارياً هندسياً.", usage: "التحديات الهندسية والتقنية المعقدة." },
  { name: CreativityTechnique.DESIGN_THINKING, cat: 'strategic', difficulty: 'متقدم', time: 'متعدد الأيام', fullDesc: "منهجية تركز على الإنسان، تبدأ بالتعاطف وتنتهي باختبار النماذج الأولية للحلول.", usage: "تصميم تجربة المستخدم والمنتجات الجديدة." },
  { name: CreativityTechnique.LATERAL_THINKING, cat: 'generative', difficulty: 'متوسط', time: '30 دقيقة', fullDesc: "التفكير الجانبي الذي يهدف لكسر الأنماط الذهنية والوصول للحلول عبر طرق غير مباشرة.", usage: "الخروج من الانسداد الإبداعي." },
  { name: CreativityTechnique.BLUE_OCEAN, cat: 'strategic', difficulty: 'متقدم', time: '90 دقيقة', fullDesc: "استراتيجية خلق أسواق جديدة خالية من المنافسة بدلاً من الصراع في 'المحيطات الحمراء'.", usage: "التخطيط الاستراتيجي والمشاريع الناشئة." },
  { name: CreativityTechnique.DISNEY_METHOD, cat: 'strategic', difficulty: 'سهل', time: '45 دقيقة', fullDesc: "استخدام أدوار (الحالم، الواقعي، الناقد) لتحويل الخيال إلى خطة عمل متكاملة.", usage: "بلورة الأفكار الكبيرة وتحويلها لواقع." },
  { name: CreativityTechnique.REVERSE_BRAINSTORMING, cat: 'strategic', difficulty: 'متوسط', time: '30 دقيقة', fullDesc: "البحث عن طرق لزيادة المشكلة سوءاً ثم عكس تلك الطرق لإيجاد حلول وقائية ذكية.", usage: "كشف الثغرات الأمنية والتشغيلية." },
  { name: CreativityTechnique.LOTUS_BLOSSOM, cat: 'generative', difficulty: 'متوسط', time: '50 دقيقة', fullDesc: "توليد 64 فكرة انطلاقاً من فكرة مركزية واحدة عبر مصفوفة تشبه بتلات اللوتس.", usage: "التوسع في الأفكار والتفريع العميق." },
  { name: CreativityTechnique.MORPHOLOGICAL_ANALYSIS, cat: 'analytical', difficulty: 'متقدم', time: '60 دقيقة', fullDesc: "تحليل سمات المشكلة ودمجها في مصفوفة لاستكشاف كافة تركيبات الحلول الممكنة.", usage: "ابتكار ميزات تقنية جديدة." },
  { name: CreativityTechnique.SYNECTICS, cat: 'generative', difficulty: 'متقدم', time: '75 دقيقة', fullDesc: "استخدام الاستعارات والقياسات لربط عناصر غير مترابطة وخلق حلول غير متوقعة.", usage: "التحديات التي تتطلب إبداعاً فائقاً." },
  { name: CreativityTechnique.FORCE_FIELD, cat: 'analytical', difficulty: 'سهل', time: '30 دقيقة', fullDesc: "تحليل القوى الدافعة للتغيير مقابل القوى المقاومة له لإدارة التحول بفعالية.", usage: "إدارة التغيير المؤسسي والقرارات الصعبة." },
  { name: CreativityTechnique.MIND_MAPPING, cat: 'analytical', difficulty: 'سهل', time: '20 دقيقة', fullDesc: "تنظيم المعلومات بصرياً حول موضوع مركزي لتحفيز الذاكرة وتوليد الروابط.", usage: "التخطيط، المذاكرة، وتلخيص الأفكار." },
  { name: CreativityTechnique.SWOT_CREATIVE, cat: 'analytical', difficulty: 'متوسط', time: '45 دقيقة', fullDesc: "تحليل نقاط القوة والضعف والفرص والتهديدات مع التركيز على استخراج حلول ابتكارية.", usage: "تقييم المشاريع وبناء الاستراتيجيات." },
  { name: CreativityTechnique.RANDOM_WORD, cat: 'generative', difficulty: 'سهل', time: '10 دقيقة', fullDesc: "استخدام كلمات عشوائية لتحفيز الدماغ على بناء روابط جديدة تماماً مع المشكلة.", usage: "كسر الجمود الذهني السريع." },
  { name: CreativityTechnique.STORYBOARDING, cat: 'strategic', difficulty: 'متوسط', time: '60 دقيقة', fullDesc: "تصوير تسلسل الحل كقصة مرئية لفهم رحلة المستخدم وتدفق العمليات.", usage: "تطوير التطبيقات والعمليات الإجرائية." },
  { name: CreativityTechnique.EMPATHY_MAPPING, cat: 'analytical', difficulty: 'متوسط', time: '40 دقيقة', fullDesc: "رسم خريطة لمشاعر واحتياجات وسلوكيات المستخدم المستهدف لفهمه بعمق.", usage: "تحسين تجربة العميل وتصميم المنتجات." },
  { name: CreativityTechnique.MEDICI_EFFECT, cat: 'generative', difficulty: 'متوسط', time: 'غير محدد', fullDesc: "الابتكار عند تقاطع تخصصات مختلفة لخلق أفكار هجينة فريدة من نوعها.", usage: "المشاريع المتعددة التخصصات." },
  { name: CreativityTechnique.PARALLEL_THINKING, cat: 'strategic', difficulty: 'سهل', time: '30 دقيقة', fullDesc: "توجيه الفريق للتفكير في مسار واحد في وقت واحد لتجنب الجدل العقيم.", usage: "إدارة حوارات الفرق وحل المشكلات الجماعية." },
  { name: CreativityTechnique.BIOMIMICRY, cat: 'generative', difficulty: 'متقدم', time: 'غير محدد', fullDesc: "استلهام الحلول الهندسية والتنظيمية من أنظمة الطبيعة والكائنات الحية.", usage: "الاستدامة والتصميم المعماري والصناعي." },
  { name: CreativityTechnique.ANALOGICAL_THINKING, cat: 'generative', difficulty: 'متوسط', time: '30 دقيقة', fullDesc: "حل المشكلات عبر إيجاد تماثل مع مشكلات تم حلها في مجالات أخرى تماماً.", usage: "استيراد الحلول من صناعة إلى أخرى." }
];

export const TechniquesLibrary: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredTechniques = useMemo(() => {
    return TECHNIQUES_DATA.filter(t => {
      const matchesFilter = filter === 'all' || t.cat === filter;
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                            t.fullDesc.includes(search) || 
                            t.usage.includes(search);
      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  return (
    <div className="w-full space-y-12 animate-in fade-in duration-700">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight">موسوعة الابتكار</h2>
        <p className="text-slate-500 text-sm md:text-xl font-bold max-w-2xl mx-auto leading-relaxed">
          الدليل المرئي والشامل لـ 23 منهجية عالمية لتحويل التحديات إلى فرص ملموسة.
        </p>
      </div>

      {/* Controls: Search & Filter */}
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Search Bar */}
        <div className="relative group">
          <input
            type="text"
            placeholder="ابحث عن تقنية أو استخدام..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-5 md:py-6 px-8 md:px-14 text-lg md:text-xl bg-white border-2 border-slate-100 rounded-[2rem] shadow-xl focus:border-indigo-500 outline-none transition-all text-right font-bold placeholder:text-slate-300"
            dir="rtl"
          />
          <div className="absolute inset-y-0 left-6 flex items-center text-slate-300 group-focus-within:text-indigo-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-6 py-3 rounded-2xl font-black text-xs md:text-sm transition-all ${
                filter === key ? `${cat.color} ${cat.text} shadow-lg scale-105` : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Results */}
      {filteredTechniques.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredTechniques.map((tech, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-xl hover:shadow-2xl hover:border-indigo-200 transition-all group relative overflow-hidden flex flex-col h-full">
              <div className={`absolute top-0 right-0 w-2 h-full ${CATEGORIES[tech.cat as keyof typeof CATEGORIES].color}`}></div>
              
              <div className="space-y-6 flex-grow">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg ${CATEGORIES[tech.cat as keyof typeof CATEGORIES].color}`}>
                    <TechIcon name={tech.name} className="w-8 h-8" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${CATEGORIES[tech.cat as keyof typeof CATEGORIES].color} ${CATEGORIES[tech.cat as keyof typeof CATEGORIES].text}`}>
                      {CATEGORIES[tech.cat as keyof typeof CATEGORIES].title}
                    </span>
                    <div className="flex gap-1">
                      <span className="text-[8px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{tech.difficulty}</span>
                      <span className="text-[8px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">{tech.time}</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">
                  {tech.name}
                </h3>
                
                <p className="text-sm md:text-lg font-bold text-slate-600 leading-relaxed">
                  {tech.fullDesc}
                </p>

                <div className="pt-6 border-t border-slate-50 mt-auto">
                  <h4 className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-2">الاستخدام الأمثل</h4>
                  <p className="text-xs md:text-base font-black text-indigo-600 italic">
                    "{tech.usage}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
           <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
           </div>
           <p className="text-slate-400 font-black text-xl md:text-3xl">عذراً، لم نجد نتائج تطابق بحثك</p>
           <button onClick={() => {setSearch(''); setFilter('all');}} className="mt-6 px-8 py-3 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 transition-all">عرض كافة التقنيات</button>
        </div>
      )}
    </div>
  );
};
