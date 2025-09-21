// Sidebar toggle
const toggleBtn = document.getElementById('toggleBtn');
const sidebar = document.querySelector('.sidebar');
toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});
function sendMessage() {
    const msg = chatInput.value.trim();
    if (msg === '') return;

    // User message
    const userMsg = document.createElement('p');
    userMsg.classList.add('user'); // <-- bubble style
    userMsg.textContent = msg;
    chatWindow.appendChild(userMsg);
    chatInput.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Bot response
    setTimeout(() => {
        const botMsg = document.createElement('p');
        botMsg.classList.add('bot'); // <-- bubble style
        botMsg.textContent = generateSmartReply(msg.toLowerCase());
        chatWindow.appendChild(botMsg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 500);
}

// Animated counters
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 200;
    if(count < target){
      counter.innerText = Math.ceil(count + increment);
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});


// Telkom-specific promotions
const promotions = [
    {
        name: "iPhone 15",
        price: "$1200",
        description: "Latest iPhone 15 available for distributors at special rates.",
        image: "https://via.placeholder.com/250x150?text=iPhone+15"
    },
    {
        name: "Discounted Data Bundle 5GB",
        price: "$10",
        description: "Get 5GB data at 50% off for Telkom customers.",
        image: "https://via.placeholder.com/250x150?text=5GB+Data"
    },
    {
        name: "Airtime Top-Up $20",
        price: "$20",
        description: "Prepaid airtime recharge for customers.",
        image: "https://via.placeholder.com/250x150?text=Airtime+Topup"
    },
    {
        name: "Samsung Galaxy S23",
        price: "$950",
        description: "High-demand smartphone with distributor discounts.",
        image: "https://via.placeholder.com/250x150?text=Galaxy+S23"
    },
    {
        name: "Discounted Data Bundle 10GB",
        price: "$18",
        description: "Get 10GB data at 40% off for Telkom customers.",
        image: "https://via.placeholder.com/250x150?text=10GB+Data"
    },
    {
        name: "Airtime Top-Up $50",
        price: "$50",
        description: "Popular prepaid recharge for Telkom customers.",
        image: "https://via.placeholder.com/250x150?text=Airtime+50"
    }
];

const promoList = document.getElementById('promotionList');
promoList.innerHTML = ''; // clear existing
promotions.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('promotion-card');
    card.innerHTML = `
    <img src="${p.image}" alt="${p.name}">
    <h4>${p.name}</h4>
    <span>${p.price}</span>
    <p>${p.description}</p>
  `;
    promoList.appendChild(card);
});


// Chatbot functionality
const chatWindow = document.getElementById('chatWindow');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', e => { if(e.key==='Enter') sendMessage(); });

function sendMessage() {
  const msg = chatInput.value.trim();
  if(msg === '') return;
  
  // User message
  const userMsg = document.createElement('p');
  userMsg.innerHTML = `<strong>You:</strong> ${msg}`;
  chatWindow.appendChild(userMsg);
  chatInput.value = '';
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Bot response
  setTimeout(() => {
    const botMsg = document.createElement('p');
    botMsg.innerHTML = `<strong>Bot:</strong> ${generateSmartReply(msg.toLowerCase())}`;
    chatWindow.appendChild(botMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 500);
}

// Smarter JS chatbot logic with multiple dynamic replies
function generateSmartReply(message){
  const greetings = [
    "Hello! How can I help you today?",
    "Hi there! What can I do for you?",
    "Hey! Need assistance with anything?"
  ];

  const promotionsReplies = [
    "Current promotions: Telkom Router X 20% off, Fiber 100Mbps 15% off, Prepaid SIM Pack Buy 2 Get 1.",
    "Check out these deals: Router X at 20% off, Fiber 100Mbps 15% off, Prepaid SIM Pack Buy 2 Get 1.",
    "New promotions available! Telkom Router X 20% off, Fiber 100Mbps 15% off, Prepaid SIM Pack Buy 2 Get 1."
  ];

  const stockReplies = [
    "You can view product stock levels in the Promotions section.",
    "Stock information is available in the Promotions list.",
    "Check the Promotions panel for real-time stock updates."
  ];

  const helpReplies = [
    "I’m here to help! Ask me about promotions, stock, or training materials.",
    "Need assistance? You can ask me about product availability or resources.",
    "I can help with promotions, stock info, or training materials."
  ];

  const trainingReplies = [
    "All training materials and marketing resources are available under the Resources section.",
    "You can access training and marketing resources in the Resources panel.",
    "Find all your training and product info in the Resources section."
  ];

  const unknownReplies = [
    "Sorry, I didn't understand that. Can you rephrase?",
    "Hmm, I’m not sure. Try asking about promotions, stock, or training.",
    "I didn’t get that. You can ask me about Telkom products or resources."
  ];

  // Keyword matching
  if(message.includes("hello") || message.includes("hi")) 
    return greetings[Math.floor(Math.random() * greetings.length)];
  if(message.includes("promotion") || message.includes("promo")) 
    return promotionsReplies[Math.floor(Math.random() * promotionsReplies.length)];
  if(message.includes("stock") || message.includes("availability")) 
    return stockReplies[Math.floor(Math.random() * stockReplies.length)];
  if(message.includes("help")) 
    return helpReplies[Math.floor(Math.random() * helpReplies.length)];
  if(message.includes("training") || message.includes("resources")) 
    return trainingReplies[Math.floor(Math.random() * trainingReplies.length)];

  return unknownReplies[Math.floor(Math.random() * unknownReplies.length)];
}
