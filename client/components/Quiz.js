import React from 'react'
import { distractor } from '@/components/api';

export default function Quiz(item, func, answers) {
  const data = item.item;
  console.log(data)

  const setAnswer = (e,idx,value ,func, myAnswer) => {
    e.preventDefault();
    console.log(idx);
    console.log(value);
    console.log(myAnswer);
    const newList = myAnswer;
    newList[idx] = value;
    func(newList);
    console.log(myAnswer);
  }
  return (
    <div class='flex flex-col p-5 justify-center bg-gray-700 rounded-md'>

        <h1 class='text-white pb-5'>{data.index+1}. {data.question}</h1>
        <fieldset class='text-white'>
        <ul class='flex-col'>
          {data.distractor.map((data, key) => (
              <li>
                <input type='radio' id={data} onClick={(e) => setAnswer(e,item.item.index, data, func, answers)} name={item.index+1} value={data} class='dark:text-white'/>
                <label for={data}> {key+1}) {data} </label>
              </li>
          ))}
        </ul>
        </fieldset>
    </div>
  );
}