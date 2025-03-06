import Chatbot from "@/app/chatBot/ChatBot";

export default function Home() {
  return (
    <main className="page">
      <div className="container">
        <div className="header">

          <p>Talk to <span className='special-text'></span></p>
          <Chatbot />
        </div>
      </div>
    </main>
  );
}
