import React from 'react'

function Quiz(question, index) {
  return (
    <div>
        <h1 class=''>{index+1}: {question}</h1>
        {/* {distractor.map((data, key) => {
            <input type='radio' name={key} value={data}>{data}</input>
        })}; */}
    </div>
  )
}

export default Quiz