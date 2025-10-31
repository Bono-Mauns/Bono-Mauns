// استيراد مكتبة جوجل للذكاء الاصطناعي
const { GoogleGenerativeAI } = require("@google/generative-ai");

// هذا هو ملف الخادم (الوظيفة السحابية) الخاص بنا
exports.handler = async function(event, context) {
    
    // --- 1. الإعداد والتحقق ---
    
    // تأكد من أن الطلب هو من نوع POST (لإرسال البيانات)
    if (event.httpMethod !== "POST"  ) {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // --- !!! تنبيه: استخدام المفتاح مباشرة في الكود (للتجربة فقط) !!! ---
        const genAI = new GoogleGenerativeAI("AIzaSyAxo1mfi0MRwdYlGNTP6MCZJeh-L1fi6sA");
        
        // استخراج رسالة المستخدم من الطلب القادم
        const requestBody = JSON.parse(event.body);
        const userMessage = requestBody.message;

        // --- 2. الاتصال بـ Gemini ---

        // اختر النموذج الذي تريد استخدامه
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // ابدأ محادثة جديدة وأرسل رسالة المستخدم
        const chat = model.startChat();
        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        const manusReply = response.text();

        // --- 3. إرجاع الرد الحقيقي من Gemini ---
        return {
            statusCode: 200,
            body: JSON.stringify({ reply: manusReply })
        };

    } catch (error) {
        // في حالة حدوث أي خطأ (مثل مفتاح API خاطئ)
        console.error("Error calling Gemini API:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "حدث خطأ أثناء الاتصال بـ مانوس." })
        };
    }
};
