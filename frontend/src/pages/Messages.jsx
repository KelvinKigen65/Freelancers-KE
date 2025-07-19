export default function Messages() {
  return (
    <div className="flex h-[80vh] max-w-5xl mx-auto mt-8 bg-white rounded-xl shadow overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 bg-blue-50 p-4 border-r">
        <h3 className="text-lg font-bold mb-4 text-blue-700">Conversations</h3>
        <ul className="space-y-2">
          {[1,2,3].map(i => (
            <li key={i} className="flex items-center gap-3 p-2 rounded hover:bg-blue-100 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-lg font-bold text-blue-700">U{i}</div>
              <div>
                <div className="font-semibold">User {i}</div>
                <div className="text-xs text-gray-500">Last message preview...</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {/* Message bubbles */}
          <div className="flex gap-2 items-end">
            <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-sm font-bold text-blue-700">U1</div>
            <div className="bg-blue-100 text-blue-900 px-4 py-2 rounded-2xl max-w-xs">Hi! I'm interested in your project.</div>
          </div>
          <div className="flex gap-2 items-end justify-end">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-2xl max-w-xs">Great! Please send your proposal.</div>
            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center text-sm font-bold text-purple-700">Me</div>
          </div>
        </div>
        <form className="flex p-4 border-t gap-2">
          <input className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Type your message..." />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow">Send</button>
        </form>
      </div>
    </div>
  )
} 