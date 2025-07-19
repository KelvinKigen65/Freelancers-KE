import { useState } from 'react'

export default function Assistant() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you today?' }
  ])
  const [input, setInput] = useState('')

  function handleSend(e) {
    e.preventDefault()
    if (!input.trim()) return
    setMessages([...messages, { from: 'user', text: input }])
    setInput('')
    // Simulate bot response
    setTimeout(() => {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'This is a smart assistant response.' }])
    }, 800)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl flex flex-col h-[70vh]">
        <div className="p-4 border-b text-blue-700 font-bold text-xl">Smart Assistant</div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-4 py-2 rounded-2xl max-w-xs ${msg.from === 'user' ? 'bg-purple-600 text-white' : 'bg-blue-100 text-blue-900'}`}>{msg.text}</div>
            </div>
          ))}
        </div>
        <form className="flex p-4 border-t gap-2" onSubmit={handleSend}>
          <input className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Ask the assistant..." value={input} onChange={e => setInput(e.target.value)} />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">Send</button>
        </form>
      </div>
    </div>
  )
} 