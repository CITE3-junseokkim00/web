export const makeChunk = (text) => {
    fetch(`http://127.0.0.1:8080/api/makeChunk/${text.text}`).then(
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
    fetch(`http://127.0.0.1:8080/api/summarization/${text.text}`).then(
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
    fetch(`http://127.0.0.1:8080/api/extract/${text.text}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data['response']);
            func(data['response']);
        }
    )
}

export const generation = (text, answer, func) => {
    fetch(`http://127.0.0.1:8080/api/generation/${text.text}/${answer.answer}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data['0'].generated_text)
            func(data['0'].generated_text)
        }
    )
}


export const distractor = (text, answer, func) => {
    fetch(`http://127.0.0.1:8080/api/distractors/${text.text}/${answer.answer}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data['response'])
            func(data['response'])
        }
    )
}

export const makeQuiz = (text, func) => {
    console.log(text)
    fetch(`http://127.0.0.1:8081/api/makeQuiz/${text}`).then(
        (response) => response.json()
    ).then(
        (data) => {
            console.log(data)
            func(data)
        }
    )
}