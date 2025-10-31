// --- كلمة المرور ---
// لا تغيرها إلا إذا أردت ذلك
const SECRET_PASSWORD = "كلمة المرور الرقمية التي تعمل معك"0102948596
// --- عنوان الخادم (المايسترو) ---
// هذا هو الرابط للوظيفة السحابية التي أنشأناها على Netlify
const API_ENDPOINT = `/.netlify/functions/chat`;


// --- منطق تسجيل الدخول (لا يتغير) ---
function checkPassword() {
    const input = document.getElementById('password-input').value;
    if (input === SECRET_PASSWORD) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('studio-screen').style.display = 'flex';
    } else {
        document.getElementById('login-error').textContent = "كلمة المرور غير صحيحة.";
        document.getElementById('password-input').value = "";
    }
}

// --- منطق الدردشة (النسخة النهائية) ---
async function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const thinkingIndicator = document.getElementById('thinking-indicator');
    
    const userMessage = chatInput.value.trim();
    if (userMessage === "") return;

    // 1. عرض رسالة المستخدم فورًا
    addMessageToChat(userMessage, 'user');
    chatInput.value = "";

    // 2. إظهار مؤشر التفكير وتعطيل الزر
    thinkingIndicator.style.display = 'block';
    sendButton.disabled = true;

    try {
        // 3. إرسال الرسالة إلى الخادم (المايسترو)
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            // إذا فشل الخادم في الرد بشكل صحيح
            throw new Error(`Server error: ${response.statusText}`);
        }

        // 4. استقبال الرد الحقيقي من الخادم
        const data = await response.json();
        const manusReply = data.reply;

        // 5. عرض رد مانوس الحقيقي
        addMessageToChat(manusReply, 'manus');

    } catch (error) {
        // في حالة فشل الاتصال بالخادم
        console.error("Fetch error:", error);
        addMessageToChat("عذرًا، لا يمكنني الوصول إلى عقلي الآن. حاول مرة أخرى.", 'manus');
    } finally {
        // 6. إخفاء مؤشر التفكير وتفعيل الزر مجددًا
        thinkingIndicator.style.display = 'none';
        sendButton.disabled = false;
    }
}

// --- وظيفة مساعدة لإضافة الرسائل (لا تتغير) ---
function addMessageToChat(text, sender) {
    const chatWindow = document.getElementById('chat-window');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = text;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}


// --- ربط كل شيء بالأحداث عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', () => {
    // ربط تسجيل الدخول
    document.getElementById('login-button').addEventListener('click', checkPassword);
    document.getElementById('password-input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkPassword();
        }
    });

    // ربط الدردشة
    document.getElementById('send-button').addEventListener('click', sendMessage);
    document.getElementById('chat-input').addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
