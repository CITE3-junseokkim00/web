import Header from '@/components/Header'
import Footer from '@/components/Footer'
import React, { useState } from 'react'

function sandbox() {

  const [sayhiResult, setSayhiResult] = useState("never run")
  const [summarizeResult, setSummarizeResult] = useState("never run")
  const [extractResult, setExtractResult] = useState("never run")
  const [generationResult, setGenerationResult] = useState("never run")
  const [distractorResult, setDistractorResult] = useState("never run")
  

  const sayHi = () => {
    fetch(`http://127.0.0.1:8080/api`).then(
      (response) => response.json()
    ).then(
      (data) => { 
        setSayhiResult(data.Hello) 
      }
    )
  }
  const summarize = (text) => {
    fetch(`http://127.0.0.1:8080/api/summarization/${text.text}`).then(
      (response) => response.json()
    ).then(
      (data) => {
        setSummarizeResult(data['0'].summary_text)
      }
    )
  }

  const keyExtraction = (text) => {
    fetch(`http://127.0.0.1:8080/api/extract/${text.text}`).then(
      (response) => response.json()
    ).then(
      (data) => {
        setExtractResult(data['response'])
      }
    )
  }

  const generation = (text, answer) => {
    fetch(`http://127.0.0.1:8080/api/generation/${text.text}/${answer.answer}`).then(
      (response) => response.json()
    ).then(
      (data) => {
        setGenerationResult(data['0'].generated_text)
      }
    )
  }


  const distractor = (text, answer) => {
    fetch(`http://127.0.0.1:8080/api/distractors/${text.text}/${answer.answer}`).then(
      (response) => response.json()
    ).then(
      (data) => {
        setDistractorResult(data['response'])
      }
    )
  }


  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <div class='min-h-screen bg-black'>
        <Header/>
        <div class='w-full flex flex-col justify-center items-center'>
        <div>
            <div class='flex justify-center m-2 border-solid p-3 gap-3'>
            <button type='button' onClick={() => sayHi()} class="px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-300 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">sayHi</button>
            <button type='button' onClick={() => summarize({text})} class="px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-300 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">summarize!</button>
            <button type='button' onClick={() => keyExtraction({text})} class="px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-300 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">keyword extract!</button>
            <button type='button' onClick={() => generation({text},{answer})} class="px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-300 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">generation!</button>
            <button type='button' onClick={() => distractor({text},{answer})} class="px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 transition duration-300 ease-in-out transform bg-transparent rounded-lg dark:text-gray-300 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">Distractor generation!</button>
            </div>
            <div class='flex justify-center gap-3 p-3'>
            <input type='text' onChange={(e) => setText(e.target.value)} value={text} class="dark:bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='text' required/>
            <input type='text' onChange={(e) => setAnswer(e.target.value)} value={answer} class="dark:bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='answer' required/>
            </div>
        </div>
        <div class='bg-gray-300 border flex-col p-4 w-5/12'>
            <h3>text: {text}</h3>
            <h3>answer: {answer}</h3>
        </div>
        <div class= 'p-4 flex-col gap-3 text-white'>
            <h3>result for sayHi: {sayhiResult}</h3>
            <h3>result for summarize: {summarizeResult}</h3>
            <h3>result for keyword extract: {extractResult} </h3>
            <h3>result for generation: {generationResult}</h3>
            <h3>result for distractor: {distractorResult}</h3>
        </div>
        </div>
        <Footer/>
    </div>
  )
}

export default sandbox