import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chat = () => {
  const [userMessage, setUserMessage] = useState(''); // To store the user's message
  const [chatHistory, setChatHistory] = useState([]); // To store the history of chat messages
  const [showPrompt, setShowPrompt] = useState(true); // To control the display of the prompt
  const [isFirstMessage, setIsFirstMessage] = useState(true); // To check if it's the first message
  const [typing, setTyping] = useState(false); // To show typing status

  const chatBoxRef = useRef(null); // Ref to access the chat box for scrolling

  // Format bold text by replacing **bold** with <strong>bold</strong>
  const formatBoldText = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  // Handle input change
  const handleInputChange = (event) => {
    setUserMessage(event.target.value);
  };

  // Send message to backend and get the bot's response
  const sendMessage = async () => {
    if (!userMessage.trim()) return; // Prevent sending empty messages

    // Add the user's message to chat history
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: 'You', message: userMessage },
    ]);
    setUserMessage(''); // Clear input field
    setShowPrompt(false); // Hide prompt after the first message
    setIsFirstMessage(false); // It's no longer the first message

    try {
      setTyping(true); // Show typing indicator

      // Send request to the backend API
      const response = await axios.post('https://api.kanishksuri.site/chat', { message: userMessage });

      // Get the response from backend (corrected to access 'reply' in the response)
      const chatReply = response.data.reply || "Sorry, I couldn't process that.";

      // Add bot's response to chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: 'Bot', message: chatReply },
      ]);
    } catch (error) {
      console.error('Error sending message:', error);

      // In case of an error, add a fallback response from the bot
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: 'Bot', message: 'Sorry, something went wrong.' },
      ]);
    } finally {
      setTyping(false); // Hide typing indicator
    }
  };

  // Handle "Enter" key press to send the message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Scroll to the bottom whenever chat history is updated
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #121212, #1a1a1a, #003300)',
        color: '#E0E0E0',
        fontFamily: "'Poppins', sans-serif",
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      {/* Header Section */}
      <div
        className="text-center"
        style={{
          opacity: showPrompt ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
          marginBottom: '20px',
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <h1
          className="welcome-header"
          style={{
            fontWeight: '700',
            wordWrap: 'break-word',
            marginBottom: '0.5rem',
            opacity: showPrompt ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          {showPrompt ? 'What can I help you with?' : ''}
        </h1>
        <p
          style={{
            fontSize: '1.5rem',
            marginTop: '10px',
            color: '#B3B3B3',
            opacity: showPrompt ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        >
          {showPrompt ? 'Ask your questions below.' : ''}
        </p>
      </div>

      {/* Chat History Section */}
      <div
        ref={chatBoxRef} // Ref added here
        className="chat-box"
        style={{
          width: '80%',
          height: '70%',
          overflowY: 'auto',
          marginBottom: '20px',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#1b1b1b',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          display: isFirstMessage ? 'none' : 'flex',
          flexDirection: 'column',
          gap: '15px',
          opacity: isFirstMessage ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {chatHistory.map((msg, index) => (
          <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
            <strong>{msg.sender}:</strong> <span dangerouslySetInnerHTML={{ __html: formatBoldText(msg.message) }} />
          </div>
        ))}



        {typing && (
          <div className="message bot">
            <strong>Bot:</strong> <span className="pulsing-dots">...</span>
          </div>
        )}


      </div>

      {/* Input Section */}
      <div
        className="input-container"
        style={{
          display: 'flex',
          width: '80%',
          position: 'absolute',
          bottom: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          gap: '10px',
        }}
      >
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyDown} // Added keydown listener for 'Enter'
          placeholder="Type your message here..."
          style={{
            flexGrow: 1,
            padding: '15px',
            borderRadius: '5px',
            fontSize: '1.2rem',
            border: '1px solid #444',
            backgroundColor: '#2a2a2a',
            color: '#E0E0E0',
            transition: '0.3s',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '15px 20px',
            backgroundColor: '#1E1E1E',
            color: '#E0E0E0',
            border: '1px solid #444',
            borderRadius: '5px',
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: '0.3s',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

// Custom styles and responsiveness
const style = document.createElement('style');
style.innerHTML = `
.message {
  padding: 10px;
  border-radius: 10px;
  background-color: #333;
  color: #E0E0E0;
  word-wrap: break-word; /* Allow text to break and wrap */
}

.message.you {
  background-color: #4CAF50;
  align-self: flex-end;
  max-width: 70%; /* Adjust user message width */
}

.message.bot {
  background-color: #2196F3;
  align-self: flex-start;
  max-width: 80%; /* Make bot message narrower */
  word-wrap: break-word; /* Ensure text wraps within the container */
  white-space: normal; /* Allow text to break and wrap */
}


.message.bot .pulsing-dots {
  // font-size: 2rem; /* Increase the size of the dots */
  animation: pulsateDots 1s ease-in-out infinite; /* Unique animation name */
}

@keyframes pulsateDots {
  0% {
    opacity: 0.5;
    transform: scale(1); /* Start normal size */
  }
  50% {
    opacity: 1;
    transform: scale(1.5); /* Make dots larger */
  }
  100% {
    opacity: 0.5;
    transform: scale(1); /* Return to normal size */
  }
}

// @keyframes pulsate {
//   0% {
//     opacity: 0.5;
//   }
//   50% {
//     opacity: 1;
//   }
//   100% {
//     opacity: 0.5;
//   }
// }



      
      button:hover {
        background-color: #292929;
        transform: scale(1.05);
        box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.5);
      }

      .welcome-header {
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
        border-right: 3px solid #E0E0E0;
        animation: typing 2.5s steps(45) 1, hold 1s forwards 4s, blink 1s step-end infinite;
        font-size: 4.3rem;
      }

      @keyframes typing {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }

      @keyframes hold {
        from {
          width: 100%;
        }
        to {
          width: 100%;
        }
      }

      @keyframes blink {
        50% {
          border-color: transparent;
        }
      }

      @media (max-width: 768px) {
        .chat-box {
          width: 90%;
          height: 60%;
        }

        .input-container {
          width: 95%;
        }

        .message {
          font-size: 1.2rem;
        }

        .message.you {
          max-width: 85%;
        }

        .message.bot {
          max-width: 85%;
        }

        button {
          padding: 12px 15px;
        }

        input {
          padding: 12px;
        }
      }

      @media (max-width: 480px) {
        .welcome-header {
          font-size: 2rem;
        }
        
      }

`;
document.head.appendChild(style);

export default Chat;
