export const makeChunk = (text) => {
    fetch(`http://16.171.244.243:80/api/makeChunk/${text.text}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data['response'][0]);
            return data['response'][0];
        }
    )
}
export const summarize = (text, func) => {
    console.log(text)
    fetch(`http://16.171.244.243:80/api/summarization/${text.text}`).then(
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
    fetch(`http://16.171.244.243:80/api/extract/${text.text}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data['response']);
            func(data['response']);
        }
    )
}

export const generation = (text, answer, func) => {
    fetch(`http://16.171.244.243:80/api/generation/${text.text}/${answer.answer}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data['0'].generated_text)
            func(data['0'].generated_text)
        }
    )
}


export const distractor = (text, answer, func) => {
    fetch(`http://16.171.244.243:80/api/distractors/${text.text}/${answer.answer}`).then(
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
    fetch(`http://16.171.244.243:80/api/makeQuiz/${text}`).then(
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