// 小智同学 - 小学生智能助手聊天应用

// 状态管理
let chatHistory = [];
let isBotTyping = false;

// DOM元素
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const quickBtns = document.querySelectorAll('.quick-btn');

// 初始化应用
function init() {
    loadChatHistory();
    renderChatHistory();
    attachEventListeners();
    scrollToBottom();
}

// 从本地存储加载聊天记录
function loadChatHistory() {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
    }
}

// 保存聊天记录到本地存储
function saveChatHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// 添加用户消息
function addUserMessage(text) {
    const message = {
        id: Date.now(),
        text: text,
        sender: 'user',
        timestamp: new Date().toISOString()
    };
    
    chatHistory.push(message);
    saveChatHistory();
    renderMessage(message);
    
    // 清空输入框
    messageInput.value = '';
    
    // 显示机器人正在输入
    showTypingIndicator();
    
    // 模拟AI回复（延迟1-2秒）
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = generateBotResponse(text);
        addBotMessage(botResponse);
    }, 1000 + Math.random() * 1000);
}

// 添加机器人消息
function addBotMessage(text) {
    const message = {
        id: Date.now(),
        text: text,
        sender: 'bot',
        timestamp: new Date().toISOString()
    };
    
    chatHistory.push(message);
    saveChatHistory();
    renderMessage(message);
}

// 生成机器人回复
function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // 数学问题
    if (lowerMessage.includes('数学') || lowerMessage.includes('算') || lowerMessage.includes('等于') || /\d+[\+\-\*\/]\d+/.test(userMessage)) {
        return handleMathQuestion(userMessage);
    }
    
    // 科学问题
    if (lowerMessage.includes('科学') || lowerMessage.includes('自然') || lowerMessage.includes('动物') || lowerMessage.includes('植物')) {
        return handleScienceQuestion(userMessage);
    }
    
    // 语文问题
    if (lowerMessage.includes('语文') || lowerMessage.includes('成语') || lowerMessage.includes('古诗') || lowerMessage.includes('作文')) {
        return handleChineseQuestion(userMessage);
    }
    
    // 英语问题
    if (lowerMessage.includes('英语') || lowerMessage.includes('english') || lowerMessage.includes('单词')) {
        return handleEnglishQuestion(userMessage);
    }
    
    // 问候
    if (lowerMessage.includes('你好') || lowerMessage.includes('嗨') || lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return getRandomResponse([
            '你好呀！我是小智同学，很高兴为你服务！😊',
            '嗨！今天有什么问题需要我帮忙解答吗？',
            '你好！我是你的学习助手，随时准备回答你的问题！✨'
        ]);
    }
    
    // 默认回复
    return getRandomResponse([
        '这个问题很有趣！让我想想怎么用简单的方式解释给你听...',
        '我明白你的问题了！对于小学生来说，我们可以这样理解：',
        '这个问题问得很好！让我用适合你年龄的方式回答：',
        '谢谢你的提问！这是一个很好的学习机会，让我来帮你解答。'
    ]) + '\n\n如果你需要更详细的解释，可以告诉我具体是哪个科目的问题哦！';
}

// 处理数学问题
function handleMathQuestion(message) {
    // 简单数学计算
    const mathMatch = message.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
    if (mathMatch) {
        const num1 = parseInt(mathMatch[1]);
        const num2 = parseInt(mathMatch[3]);
        const operator = mathMatch[2];
        
        let result;
        switch(operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num1 / num2; break;
        }
        
        return `计算 ${num1} ${operator} ${num2} 的结果是：**${result}**\n\n💡 小提示：${getMathTip(operator)}`;
    }
    
    // 25×4 这种格式
    if (message.includes('25×4') || message.includes('25*4')) {
        return '25 × 4 = **100**\n\n💡 乘法小技巧：25乘以任何数时，可以先乘以100再除以4，这样计算更快哦！';
    }
    
    return getRandomResponse([
        '数学很有趣对吧！你可以问我具体的计算题，比如"15+23等于多少？"或者"7×8怎么算？"',
        '数学是解决问题的超级工具！告诉我具体的题目，我会一步步教你解答。',
        '我喜欢数学问题！你可以问我加减乘除的计算，或者数学概念的解释。'
    ]);
}

// 处理科学问题
function handleScienceQuestion(message) {
    const responses = [
        '🌿 **光合作用**：植物通过叶子吸收阳光，把水和二氧化碳变成食物（葡萄糖）和氧气。就像植物的"厨房"！\n\n🔬 有趣的事实：没有光合作用，地球上就没有氧气供我们呼吸！',
        '🐝 **蜜蜂采蜜**：蜜蜂用舌头吸花蜜，储存在蜜胃里，飞回蜂巢后吐出来酿成蜂蜜。一只蜜蜂一生只能酿制1/12茶匙的蜂蜜！',
        '💧 **水的循环**：水从海洋蒸发变成云，云飘到陆地上空下雨，雨水流入河流最后回到海洋。这是一个永远不会停止的循环！',
        '⚡ **电的产生**：电可以通过水力、风力、太阳能产生。就像水推动水车一样，水流推动涡轮机就能发电！'
    ];
    
    return getRandomResponse(responses);
}

// 处理语文问题
function handleChineseQuestion(message) {
    if (message.includes('成语')) {
        return '📖 **成语故事：画蛇添足**\n\n古时候有几个人比赛画蛇，谁画得快就能喝酒。一个人很快画好了，看别人还没画完，就给蛇添上了脚。结果别人说："蛇没有脚，你画错了！"酒就被别人喝了。\n\n🎯 寓意：做多余的事反而坏事。';
    }
    
    return getRandomResponse([
        '📚 语文学习小贴士：每天阅读15分钟，积累好词好句，你的作文会越来越棒！',
        '🖋️ 汉字很有趣：很多汉字像图画，比如"山"像三座山峰，"水"像流动的河流。',
        '📖 阅读建议：多读童话、寓言故事，不仅能学语文，还能明白很多道理。'
    ]);
}

// 处理英语问题
function handleEnglishQuestion(message) {
    if (message.includes('你好') || message.includes('hello')) {
        return '用英语说"你好"是：**Hello!** 或者 **Hi!**\n\n其他问候语：\n- 早上好：Good morning!\n- 下午好：Good afternoon!\n- 晚上好：Good evening!\n- 再见：Goodbye! 或 Bye!';
    }
    
    return getRandomResponse([
        '🇬🇧 英语学习很有趣！每天学5个新单词，一个月就能掌握150个单词！',
        '🗣️ 练习口语的好方法：跟着英语动画片重复对话，模仿发音和语调。',
        '📝 记单词技巧：把单词和图片联系起来，或者编成有趣的小故事。'
    ]);
}

// 获取数学小贴士
function getMathTip(operator) {
    const tips = {
        '+': '加法时，可以先把容易算的数加起来，比如 7+8 可以先算 7+3=10，再加5等于15。',
        '-': '减法时，可以想成"加回去"，比如 15-7 可以想 7+8=15，所以答案是8。',
        '*': '乘法有口诀表，多背多练就能很快算出来！',
        '/': '除法是乘法的反运算，比如 20÷4 可以想 4×5=20，所以答案是5。'
    };
    return tips[operator] || '多练习就能越来越熟练！';
}

// 获取随机回复
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// 显示正在输入指示器
function showTypingIndicator() {
    if (isBotTyping) return;
    
    isBotTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="typing-indicator">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <span style="margin-left: 10px; color: #666; font-size: 14px;">小智同学正在思考...</span>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// 移除正在输入指示器
function removeTypingIndicator() {
    isBotTyping = false;
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// 渲染单条消息
function renderMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.sender}`;
    
    const time = new Date(message.timestamp);
    const timeString = `${time.getHours().toString().padStart(2, '0')}:${time.getMinutes().toString().padStart(2, '0')}`;
    
    const avatarIcon = message.sender === 'user' ? 'fas fa-user' : 'fas fa-robot';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="${avatarIcon}"></i>
        </div>
        <div class="message-content">
            <div class="message-text">${formatMessageText(message.text)}</div>
            <div class="message-time">${timeString}</div>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// 格式化消息文本（支持简单Markdown）
function formatMessageText(text) {
    // 将 **粗体** 转换为 <strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 将换行符转换为 <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    // 将 - 列表项转换为带图标的列表
    formatted = formatted.replace(/^- (.*?)(?=\n|$)/gm, '• $1');
    
    return formatted;
}

// 渲染聊天记录
function renderChatHistory() {
    chatMessages.innerHTML = '';
    chatHistory.forEach(message => {
        renderMessage(message);
    });
}

// 滚动到底部
function scrollToBottom() {
    setTimeout(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
}

// 附加事件监听器
function attachEventListeners() {
    // 发送按钮
    sendBtn.addEventListener('click', sendMessage);
    
    // 回车键发送
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 快捷问题按钮
    quickBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const question = e.target.dataset.question;
            messageInput.value = question;
            sendMessage();
        });
    });
    
    // 输入框聚焦
    messageInput.addEventListener('focus', () => {
        messageInput.parentElement.style.borderColor = '#4facfe';
    });
    
    messageInput.addEventListener('blur', () => {
        messageInput.parentElement.style.borderColor = '#e6f2ff';
    });
}

// 发送消息
function sendMessage() {
    const text = messageInput.value.trim();
    
    if (text === '') {
        // 轻微震动输入框提示
        messageInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            messageInput.style.animation = '';
        }, 500);
        return;
    }
    
    addUserMessage(text);
}

// 添加震动动画到CSS
function addShakeAnimation() {
    if (!document.querySelector('#shakeStyle')) {
        const style = document.createElement('style');
        style.id = 'shakeStyle';
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    addShakeAnimation();
    init();
});
