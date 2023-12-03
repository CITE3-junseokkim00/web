export const makeChunk = (text) => {
    fetch(`https://doc2mcq-web-server.vercel.app/api/makeChunk/${text.text}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data['response'][0]);
            return data['response'][0];
        }
    )
}

export const sayhi = () => {
    fetch(`https://doc2mcq-web-server.vercel.app/api`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data);
        }
    )
}

export const summarize = (text, func) => {
    console.log(text)
    fetch(`https://doc2mcq-web-server.vercel.app/api/summarization/${text.text}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data['0'].summary_text);
            func(data['0'].summary_text);
        }
    )
}

export const keyExtraction = (text, func) => {
    console.log(text)
    fetch(`https://doc2mcq-web-server.vercel.app/api/extract/${text.text}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data['response']);
            func(data['response']);
        }
    )
}

export const generation = (text, answer, func) => {
    fetch(`https://doc2mcq-web-server.vercel.app/api/generation/${text.text}/${answer.answer}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data['0'].generated_text)
            func(data['0'].generated_text)
        }
    )
}


export const distractor = (text, answer, func) => {
    fetch(`https://doc2mcq-web-server.vercel.app//api/distractors/${text.text}/${answer.answer}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data['response'])
            func(data['response'])
        }
    )
}

export const makeQuiz = async (text, func, func2, func3) => {
    console.log(text)
    let Answer = []
    let myAnswer = []
    fetch(`https://doc2mcq-web-server.vercel.app/api/makeQuiz/${text}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data)
            func(data)
            data['response'].map((item, key) => {
                console.log(item['answer']);
                Answer.push(item['answer']);
                myAnswer.push('');
            })
            func2(Answer);
            func3(myAnswer);
            console.log(Answer);
            console.log(myAnswer);
            
        }
    )
}