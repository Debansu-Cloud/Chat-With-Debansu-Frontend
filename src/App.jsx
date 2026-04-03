import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from 'axios'
import ReactMarkdown from "react-markdown";

function App() {
  const [count, setCount] = useState(0)
  let [question,setQuestion]=useState()

  let [data,setData]=useState("")
  let [loading,setLoading]=useState(false)

  let handleSubmit=(e)=>{
    e.preventDefault()

    setLoading(true)

    axios.post('https://chat-with-debansu-backend.onrender.com/ask',{question})
    .then((res)=>res.data)
    .then((finalRes)=>{
      console.log(finalRes);
      if(finalRes._status){
        setData(finalRes.finalData)
      }
    })
    .finally(()=>{
      setLoading(false)
    })

    console.log(question);
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        
        <h1 className="text-center font-extrabold text-3xl md:text-5xl mb-6 pt-6 text-gray-800">
          🤖 Chat with Debansu
        </h1>

        <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-[35%_auto] gap-6 p-4">

          {/* LEFT PANEL (FORM) */}
          <form 
            onSubmit={handleSubmit} 
            className="order-2 md:order-1 backdrop-blur-lg bg-white/60 shadow-xl p-5 rounded-2xl border border-white/40"
          >

            <textarea 
              value={question} 
              onChange={(e)=>setQuestion(e.target.value)}
              className="w-full p-4 h-[150px] md:h-[200px] border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Ask anything..."
            />

            <button 
              className="w-full py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-105 transition-transform duration-200 shadow-md"
            >
              ✨ Generate
            </button>

          </form>

          {/* RIGHT PANEL (RESPONSE) */}
          <div className="order-1 md:order-2 backdrop-blur-lg bg-white/60 shadow-xl rounded-2xl border border-white/40 flex flex-col">

            <div className="h-[250px] md:h-[300px] overflow-y-auto p-4 space-y-3">

              {loading ? (
                <div className="flex justify-center items-center h-full text-gray-600">
                  ⏳ Thinking...
                </div>
              ) : (
                <div className="bg-white shadow-md rounded-xl p-4 text-gray-800">
                  <ReactMarkdown>{data}</ReactMarkdown>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default App