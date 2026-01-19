
import { GoogleGenAI, Type } from "@google/genai";
import { CreativeSolution, CreativityTechnique } from "./types.ts";

export async function generateCreativeSolution(problemDescription: string): Promise<CreativeSolution> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `بصفتك "كبير استشاريي استراتيجيات الابتكار العالمي"، مهمتك هي تحليل التحدي التالي وتقديم "مصفوفة حلول" فائقة الدقة:
    التحدي: "${problemDescription}"

    أولاً: بروتوكول التشخيص العميق (Deep Diagnosis):
    1. تحليل طبيعة المشكلة: هل هي مشكلة "تقنية بحتة"، "إنسانية/سلوكية"، "إجرائية/نظامية"، أم "استراتيجية/سوقية"؟
    2. تحديد القيود الخفية: استنتج القيود المنطقية (الموارد، الوقت، المقاومة للتغيير) بناءً على سياق المشكلة.
    3. مفاضلة التقنيات: قم بتقييم 23 تقنية ابتكار متاحة، واختر التقنية التي تعالج "جذر المشكلة" وليس الأعراض فقط.

    ثانياً: معايير توليد الحلول (The Innovation Standard):
    - الابتكار (Innovation): تجاوز الحلول التقليدية والبديهية.
    - الجدوى (Feasibility): يجب أن تكون الحلول قابلة للتطبيق العملي في ظل القيود المستنتجة.
    - الوضوح (Clarity): وصف الفكرة يجب أن يكون "مشروعاً مصغراً" بحد ذاته، وليس مجرد جملة عابرة.

    دليل الربط الاستراتيجي (Strategic Mapping):
    - مشاكل التعقيد والعمليات الهندسية: (TRIZ, First Principles, Morphological Analysis).
    - مشاكل فهم العميل وتجربة المستخدم: (Design Thinking, Empathy Mapping, Storyboarding).
    - مشاكل الجمود الإداري وتراجع الأداء: (Six Hats, Five Whys, Force Field Analysis).
    - مشاكل الابتكار في المنتج والتطوير: (SCAMPER, Biomimicry, Medici Effect).
    - مشاكل التنافسية وبناء الهوية: (Blue Ocean, Analogical Thinking).

    المخرجات المطلوبة: JSON احترافي باللغة العربية يلتزم بالهيكل المحدد بدقة، مع التركيز على "التوازن" بين الخيال الجامح والواقع التنفيذي.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          techniqueName: { type: Type.STRING, description: "اسم التقنية المختارة بدقة من قائمة التقنيات المتاحة" },
          techniqueCategory: { type: Type.STRING, enum: ["analytical", "generative", "strategic"] },
          techniqueDescription: { type: Type.STRING, description: "شرح معمق لفلسفة هذه التقنية" },
          problemClassification: { type: Type.STRING, description: "تشخيص لنوع المشكلة (مثلاً: تحدي سلوكي بشري، فجوة تقنية هيكلية)" },
          whyChosen: { type: Type.STRING, description: "تفسير منطقي قوي يربط طبيعة المشكلة بآلية عمل التقنية" },
          innovativeIdeas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "عنوان الفكرة المبتكرة" },
                description: { type: Type.STRING, description: "شرح تفصيلي، واضح، وعملي لكيفية عمل الفكرة" },
                impactScore: { type: Type.NUMBER, description: "درجة الأثر الاستراتيجي من 1 إلى 10" }
              },
              required: ["title", "description", "impactScore"]
            }
          },
          feasibilityAnalysis: { type: Type.STRING, description: "تحليل صريح لمدى قابلية هذه الحلول للتطبيق الفعلي" },
          riskAssessment: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                risk: { type: Type.STRING, description: "عقبة واقعية قد تواجه التنفيذ" },
                mitigation: { type: Type.STRING, description: "حل ذكي لتجاوز هذه العقبة" }
              },
              required: ["risk", "mitigation"]
            }
          },
          steps: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "اسم المرحلة" },
                content: { type: Type.STRING, description: "إجراءات تنفيذية واضحة ومحددة" }
              },
              required: ["title", "content"]
            }
          },
          finalRecommendation: { type: Type.STRING, description: "خلاصة تنفيذية مركزة" },
          suggestedActionItems: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "قائمة مهام عاجلة (To-Do List)"
          },
          expectedImpact: { type: Type.STRING, description: "النتيجة النهائية المرجوة بعد تطبيق هذه الحلول" }
        },
        required: [
          "techniqueName", "techniqueCategory", "techniqueDescription", 
          "problemClassification", "whyChosen", "innovativeIdeas", 
          "feasibilityAnalysis", "riskAssessment", "steps", 
          "finalRecommendation", "suggestedActionItems", "expectedImpact"
        ]
      },
      thinkingConfig: { thinkingBudget: 32000 }
    }
  });

  const text = response.text;
  if (!text) throw new Error("لم يتمكن المحرك من تحليل التحدي. حاول تبسيط الوصف قليلاً.");
  
  try {
    return JSON.parse(text) as CreativeSolution;
  } catch (e) {
    throw new Error("حدث خطأ في معالجة البيانات الإبداعية. نرجو إعادة المحاولة.");
  }
}
