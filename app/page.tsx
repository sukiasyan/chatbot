import Chatbot from "@/app/chatBot/ChatBot";

export default function Home() {
  return (
      <main className="page h-screen flex flex-col">
        {/* Fixed Header */}
        <header className="bg-orange-600 p-4 text-white text-center fixed top-0 left-0 right-0 z-10">
          <h1 className="text-2xl font-bold">AI Chatbot</h1>
        </header>

        {/* Main Container */}
        <div className="flex flex-1 pt-16"> {/* pt-16 to account for the fixed header */}
          {/* Fixed Left Sidebar (Chat History) */}
          <aside className="w-64 bg-gray-800 text-white p-4 fixed left-0 top-16 bottom-0 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Chat History</h2>
            <p className="text-gray-400">History will appear here later.</p>
          </aside>

          {/* Chatbot Component */}
          <div className="flex-1 bg-gray-700 ml-64"> {/* ml-64 to account for the sidebar width */}
            <Chatbot />
          </div>
        </div>
      </main>
  );
}