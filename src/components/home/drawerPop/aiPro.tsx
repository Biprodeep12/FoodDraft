import { useState } from "react";


export const ProductAI=()=>{
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSend = async () => {
    const res = await fetch('/api/aiProduct', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    setOutput(data.choices?.[0]?.message?.content || 'No response');
  };
    return(
    <div>
      <h1>Gemini AI Chat</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask something..."
      />
      <button onClick={handleSend}>Send</button>
      <p>Response: {output}</p>
    </div>
    )
}