import React, { useState } from 'react'

function index() {

  const [sayhiResult, setSayhiResult] = useState("never run")
  const [summarizeResult, setSummarizeResult] = useState("never run")
  const [generationResult, setGenerationResult] = useState("never run")

  const sayHi = () => {
    fetch(`http://127.0.0.1:8080/api`).then(
      (response) => response.json()
    ).then(
      (data) => { setSayhiResult(data.Hello) }
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

  const generation = (text, answer) => {
    fetch(`http://127.0.0.1:8080/api/generation/${text.text}/${answer.text}`).then(
      (response) => response.json()
    ).then(
      (data) => {
        setGenerationResult(data['0'].generated_text)
        console.log(data)
      }
    )
  }
  const [text, setText] = useState("");
  const [context, setContext] = useState("");
  const [answer, setAnswer] = useState("");

  const sampleSummarization = "양자역학은 분자, 원자, 전자, 소립자 등 미시적인 계의 현상을 다루는 즉, 작은 크기를 갖는 계의 현상을 연구하는 물리학의 분야입니다. 또는 아원자 입자 및 입자 집단을 다루는 현대 물리학의 기초 이론입니다. 아무리 기이하고 터무니없는 사건이라 해도, 발생 확률이 0이 아닌 이상 반드시 일어난다는 물리학적 아이디어에 기초합니다. 양자역학의 양자는 물리량에 기본 단위가 있으며, 그 기본 단위에 정수배만 존재한다는 뜻을 담고 있습니다. \
  현대 물리학의 기초인 양자역학은 컴퓨터의 주요 부품인 반도체의 원리를 설명해 주고, \"물질의 운동이 본질적으로 비결정론적인가?\" 라는 의문을 제기하며 과학기술, 철학, 문학, 예술 등 다방면에 중요한 영향을 미쳐 20세기 과학사에서 빼놓을 수 없는 중요한 이론으로 평가되고 있습니다.\
  19세기 중반까지의 실험은 뉴턴의 고전역학으로 설명할 수 있었습니다. 그러나, 19세기 후반부터 20세기 초반까지 이루어진 전자, 양성자, 중성자 등의 아원자 입자와 관련된 실험들의 결과는 고전역학으로 설명을 시도할 경우 모순이 발생하여 이를 해결하기 위한 새로운 역학 체계가 필요하게 되었습니다. \
  이 양자역학은 플랑크의 양자 가설을 계기로 하여 슈뢰딩거, 하이젠베르크, 디랙 등에 의해 만들어진 전적으로 20세기에 이루어진 학문입니다. 양자역학에서 플랑크 상수를 0으로 극한을 취하면 양자역학이 고전역학으로 수렴하는데, 이를 대응 원리라고 합니다."
  const sampleContext = ""
  const sampleAnswer = ""

  return (
    <div class='w-full flex flex-col justify-center items-center'>
      <div>
        <div class='flex justify-center m-2 border-solid p-3 gap-3'>
          <button type='button' onClick={() => sayHi()} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">sayHi</button>
          <button type='button' onClick={() => summarize({text})} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">summarize!</button>
          <button type='button' onClick={() => generation({context},{answer})} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">generation!</button>
        </div>
        <div class='flex justify-center gap-3 p-3'>
          <input type='text' onChange={(e) => setText(e.target.value)} value={text} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='text' required/>
          <input type='text' onChange={(e) => setContext(e.target.value)} value={context} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='context' required/>
          <input type='text' onChange={(e) => setAnswer(e.target.value)} value={answer} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='answer' required/>
        </div>
      </div>
      <div class='bg-gray-300 border flex-col p-4 w-5/12'>
        <h3>text: {text}</h3>
        <h3>context: {context}</h3>
        <h3>answer: {answer}</h3>
      </div>
      <div class= 'p-4 flex-col gap-3'>
        <h3>result for sayHi: {sayhiResult}</h3>
        <h3>result for summarize: {summarizeResult}</h3>
        <h3>result for generation: {generationResult}</h3>
      </div>
    </div>
  )
}

export default index