
import React, { useState, useEffect } from 'react';
import { Layout } from './Layout.tsx';
import { ProblemForm } from './ProblemForm.tsx';
import { SolutionDisplay } from './SolutionDisplay.tsx';
import { LoadingOverlay } from './LoadingOverlay.tsx';
import { TechniquesLibrary } from './TechniquesLibrary.tsx';
import { generateCreativeSolution } from './geminiService.ts';
import { CreativeSolution, ProblemHistory } from './types.ts';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentSolution, setCurrentSolution] = useState<CreativeSolution | null>(null);
  const [currentProblem, setCurrentProblem] = useState<string>('');
  const [showLibrary, setShowLibrary] = useState(false);
  const [history, setHistory] = useState<ProblemHistory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('creative_lab_history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleProcessProblem = async (problem: string) => {
    setLoading(true);
    setError(null);
    setCurrentSolution(null);
    setCurrentProblem(problem);
    setShowLibrary(false);
    
    try {
      const solution = await generateCreativeSolution(problem);
      setCurrentSolution(solution);
      
      const newEntry: ProblemHistory = {
        id: Date.now().toString(),
        problem,
        solution,
        timestamp: Date.now()
      };
      
      const updatedHistory = [newEntry, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem('creative_lab_history', JSON.stringify(updatedHistory));
      
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err: any) {
      console.error(err);
      setError('حدث خطأ في معالجة التحدي. نرجو التحقق من جودة الاتصال.');
    } finally {
      setLoading(false);
    }
  };

  const backToHome = () => {
    setCurrentSolution(null);
    setCurrentProblem('');
    setShowLibrary(false);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLibrary = () => {
    setShowLibrary(!showLibrary);
    setCurrentSolution(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      {loading && <LoadingOverlay />}
      
      {(currentSolution || showLibrary) && (
        <div className="glass-effect border-b border-slate-100 py-3 sticky top-16 md:top-20 z-50">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <button 
              onClick={backToHome}
              className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-black text-sm md:text-lg transition-all active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 md:w-6 md:h-6"><path d="m9 18 6-6-6-6"/></svg>
              الرئيسية
            </button>
            <div className="flex flex-col items-center">
               <span className="text-slate-900 font-black text-xs md:text-base uppercase tracking-widest">
                 {showLibrary ? 'موسوعة التقنيات' : 'مصفوفة الابتكار'}
               </span>
            </div>
            {!showLibrary ? (
              <button 
                onClick={() => window.print()}
                className="p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/></svg>
              </button>
            ) : <div className="w-8"></div>}
          </div>
        </div>
      )}

      {showLibrary ? (
        <div className="max-w-7xl mx-auto px-4 pt-8 md:pt-24 pb-32">
          <TechniquesLibrary />
        </div>
      ) : !currentSolution ? (
        <div className="animate-in fade-in duration-700">
          <div className="relative pt-12 pb-12 md:pt-40 md:pb-56 text-center px-4 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[250px] md:h-[600px] bg-indigo-50/60 blur-[100px] rounded-full -z-10 animate-pulse"></div>
            
            <div className="relative max-w-7xl mx-auto space-y-4 md:space-y-10 px-2">
              <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-600 text-[10px] md:text-lg font-black uppercase tracking-widest shadow-lg shadow-indigo-100/30">
                  منصة الابتكار الرقمي
                </div>
                <button 
                  onClick={toggleLibrary}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 text-white text-[10px] md:text-lg font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all"
                >
                  تصفح التقنيات
                </button>
              </div>
              
              <h2 className="text-4xl md:text-9xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                مختبر الإبداع
              </h2>
              
              <p className="text-slate-500 text-sm md:text-3xl max-w-3xl mx-auto font-bold leading-relaxed px-4 opacity-90">
                تحويل التحديات إلى حلول مبتكرة بالاعتماد على تقنيات التفكير الإبداعي وأدواته المطورة
              </p>

              <div className="flex justify-center pt-2 md:pt-4">
                <div className="w-12 h-1 md:w-16 md:h-1.5 bg-indigo-600 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="-mt-4 md:-mt-36 px-4 relative z-10 max-w-6xl mx-auto">
            <ProblemForm onSubmit={handleProcessProblem} isLoading={loading} />
          </div>

          <div className="max-w-7xl mx-auto px-4 mt-12 md:mt-32 pb-32">
            {error && (
              <div className="mb-10 p-5 bg-red-50 border-2 border-red-100 rounded-2xl text-red-600 text-center font-black text-sm md:text-xl">
                {error}
              </div>
            )}

            {!loading && history.length > 0 && (
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-lg md:text-4xl font-black text-slate-900">سجل التحديات</h3>
                  <span className="text-[9px] md:text-sm text-slate-400 font-bold uppercase tracking-widest">الأخيرة</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {history.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => {
                        setCurrentProblem(item.problem);
                        setCurrentSolution(item.solution);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="creative-card p-5 md:p-10 cursor-pointer group hover:bg-slate-50 active:scale-[0.98] transition-all relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[9px] md:text-xs font-black text-indigo-600 uppercase bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-50">{item.solution.techniqueName}</span>
                        <span className="text-[8px] md:text-[10px] text-slate-400 font-bold">{new Date(item.timestamp).toLocaleDateString('ar-SA')}</span>
                      </div>
                      <h4 className="font-black text-slate-800 line-clamp-2 text-base md:text-2xl leading-tight text-right">
                        "{item.problem}"
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-screen pb-12 animate-in fade-in">
          <div className="max-w-5xl mx-auto px-2 md:px-4 pt-4 md:pt-16">
            <SolutionDisplay solution={currentSolution} problem={currentProblem} />
            <div className="mt-12 text-center pb-24 px-4">
              <button 
                onClick={backToHome}
                className="w-full md:w-auto px-10 py-5 md:py-8 bg-indigo-600 text-white font-black rounded-2xl md:rounded-[2.5rem] shadow-xl text-lg md:text-3xl transition-all active:scale-95"
              >
                ابتكر في تحدٍ جديد
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
