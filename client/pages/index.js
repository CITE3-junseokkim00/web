import React, { useState } from 'react'

function index() {

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
    <div class='w-full flex flex-col justify-center items-center'>
      <div>
        <div class='flex justify-center m-2 border-solid p-3 gap-3'>
          <button type='button' onClick={() => sayHi()} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">sayHi</button>
          <button type='button' onClick={() => summarize({text})} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">summarize!</button>
          <button type='button' onClick={() => keyExtraction({text})} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">keyword extract!</button>
          <button type='button' onClick={() => generation({text},{answer})} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">generation!</button>
          <button type='button' onClick={() => distractor({text},{answer})} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Distractor generation!</button>
        </div>
        <div class='flex justify-center gap-3 p-3'>
          <input type='text' onChange={(e) => setText(e.target.value)} value={text} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='text' required/>
          <input type='text' onChange={(e) => setAnswer(e.target.value)} value={answer} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='answer' required/>
        </div>
      </div>
      <div class='bg-gray-300 border flex-col p-4 w-5/12'>
        <h3>text: {text}</h3>
        <h3>answer: {answer}</h3>
      </div>
      <div class= 'p-4 flex-col gap-3'>
        <h3>result for sayHi: {sayhiResult}</h3>
        <h3>result for summarize: {summarizeResult}</h3>
        <h3>result for keyword extract: {extractResult} </h3>
        <h3>result for generation: {generationResult}</h3>
        <h3>result for distractor: {distractorResult}</h3>

      </div>
    </div>
  )
}

export default index