
import React, { useState } from 'react';
 
function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
 
    // URL of the WhatsApp icon
    const whatsappIconUrl = 'https://cdn2.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-whatsapp-circle-512.png';
    async function sendMessageToChatbot(message) {
        try {
            const response = await fetch('http://localhost:3000/api/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.reply;
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }
 
    const handleSend = async () => {
        const reply = await sendMessageToChatbot(input);
        setMessages(messages => [...messages, { text: input, sender: 'User' }, { text: reply, sender: 'Bot' }]);
        setInput('');
    };
 
    const handleWhatsAppClick = () => {
        window.open('https://wa.me/+9779807960408', '_blank'); // Replace with your actual WhatsApp number, including the country code
    };
 
    return (
        <div>
            
            <img
                src={whatsappIconUrl} // Using the URL for the icon
                alt="WhatsApp"
                style={{ cursor: 'pointer', width: '50px', height: '50px',position: 'fixed', // Fixed position relative to the viewport
                right: '20px', // 20px from the right edge of the viewport
                bottom: '20px', // 20px from the bottom edge of the viewport
                zIndex: 1000  }}
                onClick={handleWhatsAppClick}
            />
        </div>
    );
}
 
export default ChatComponent;
 