// هذا هو ملف الخادم (الوظيفة السحابية) الخاص بنا
// اسمه الرسمي هو "handler"
exports.handler = async function(event, context) {
    
    // 1. استخراج الرسالة القادمة من المستخدم
    // event.body يحتوي على البيانات التي أرسلها الموقع
    const requestBody = JSON.parse(event.body);
    const userMessage = requestBody.message;

    // 2. هنا سنضع كود الاتصال بـ Google Gemini API لاحقًا
    // حاليًا، سنقوم فقط بإضافة كلمة "الخادم" إلى الرسالة للرد
    
    const manusReply = `أنا الخادم الحقيقي. لقد استقبلت رسالتك: "${userMessage}"`;

    // 3. إرجاع الرد إلى الموقع
    return {
        statusCode: 200, // 200 تعني "نجح الطلب"
        body: JSON.stringify({ reply: manusReply })
    };
};
