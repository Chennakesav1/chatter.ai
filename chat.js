const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggle");


let userMessage;
const API_KEY = "sk-proj-GKhgZMjc5bWTR9Ym1UeHT3BlbkFJrPghh5e2ADQvybDjjTIf";

const createChatLi = (message,className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="fa fa-cogs"></span><p>${message}</p>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incommingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incommingChatLi.querySelector("p"); 

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user",content: userMessage}]
           
        })
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Oops! something went wrong.please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";

    chatbox.appendChild(createChatLi(userMessage,"outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    setTimeout(() => {
        const incommingChatLi = createChatLi("Thinking...","incomming")
        chatbox.appendChild(incommingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incommingChatLi);

    },600);
}
sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));