function checkPassword() {
    // كلمة المرور السرية
    const secret = "0102948596Aa"; 

    // اقرأ القيمة من حقل الإدخال
    const input = document.getElementById('password-input').value;

    // قارن بينهما
    if (input === secret) {
        // إذا كانت صحيحة، اخفِ شاشة الدخول وأظهر الاستوديو
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('studio-screen').style.display = 'flex';
    } else {
        // إذا كانت خاطئة، أظهر رسالة خطأ
        const loginError = document.getElementById('login-error');
        loginError.textContent = "كلمة المرور غير صحيحة. حاول مرة أخرى.";
        // امسح حقل الإدخال
        document.getElementById('password-input').value = "";
    }
}

// --- ربط الوظيفة بالأحداث ---

// انتظر حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', () => {
    // اربط الزر بالوظيفة
    document.getElementById('login-button').addEventListener('click', checkPassword);

    // اربط زر Enter بالوظيفة
    document.getElementById('password-input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // امنع السلوك الافتراضي
            checkPassword();
        }
    });
});

// --- كود الدردشة (مؤقت) ---
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const thinkingIndicator = document.getElementById('thinking-indicator');
    const chatWindow = document.getElementById('chat-window');

    function addMessageToChat(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = text;
        chatWindow.appendChild(messageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function sendMessage() {
        const userMessage = chatInput.value.trim();
        if (userMessage === "") return;

        addMessageToChat(userMessage, 'user');
        chatInput.value = "";

        thinkingIndicator.style.display = 'block';
        sendButton.disabled = true;

        setTimeout(() => {
            thinkingIndicator.style.display = 'none';
            sendButton.disabled = false;
            const manusReply = `لقد استقبلت رسالتك: "${userMessage}". لكنني لست متصلاً بالخادم بعد.`;
            addMessageToChat(manusReply, 'manus');
        }, 1500);
    }

    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
