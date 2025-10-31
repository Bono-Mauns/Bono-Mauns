// --- انتظر حتى يتم تحميل كل شيء في الصفحة ---
document.addEventListener('DOMContentLoaded', () => {

    // --- تعريف العناصر ---
    const loginScreen = document.getElementById('login-screen');
    const studioScreen = document.getElementById('studio-screen');
    const passwordInput = document.getElementById('password-input');
    const loginButton = document.getElementById('login-button');
    const loginError = document.getElementById('login-error');

    const chatWindow = document.getElementById('chat-window');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const thinkingIndicator = document.getElementById('thinking-indicator');

    // --- كلمة المرور السرية ---
    // !!! غير هذه الكلمة إلى كلمة مرور قوية من اختيارك !!!
    const SECRET_PASSWORD = "0102948596Aa";

// --- منطق تسجيل الدخول ---
loginButton.addEventListener('click', () => {
    console.log("المدخل:", passwordInput.value);
    console.log("السري:", SECRET_PASSWORD);
    if (passwordInput.value === SECRET_PASSWORD) {
        // كلمة المرور صحيحة
        loginScreen.classList.remove('active');
        studioScreen.classList.add('active');
    } else {
        // كلمة المرور خاطئة
        loginError.textContent = "كلمة المرور غير صحيحة.";
        passwordInput.value = "";
    }
});

    
// للسماح بالدخول عند الضغط على Enter
passwordInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // منع السلوك الافتراضي لـ Enter (مثل إرسال نموذج)
        event.preventDefault(); 
        loginButton.click();
    }
});



    // --- منطق الدردشة (مؤقت حاليًا) ---
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;

        // 1. عرض رسالة المستخدم
        addMessageToChat(userMessage, 'user');
        chatInput.value = "";

        // 2. إظهار مؤشر التفكير
        thinkingIndicator.style.display = 'block';
        sendButton.disabled = true;

        // 3. محاكاة رد مانوس (سيتم استبدال هذا لاحقًا بالاتصال الحقيقي)
        setTimeout(() => {
            thinkingIndicator.style.display = 'none';
            sendButton.disabled = false;
            const manusReply = `لقد استقبلت رسالتك: "${userMessage}". لكنني لست متصلاً بالخادم بعد.`;
            addMessageToChat(manusReply, 'manus');
        }, 1500); // انتظر ثانية ونصف للرد
    }

    function addMessageToChat(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatWindow.appendChild(messageElement);
        // انزل إلى أسفل المحادثة تلقائيًا
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

});
