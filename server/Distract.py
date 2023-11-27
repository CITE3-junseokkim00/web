import openai

from apikey import OPENAI_KEY

openai.api_key = OPENAI_KEY

def distract(question, answer, model_name):
    messages = [
        {"role": "system", "content": """너는 객관식 문제를 출제하는 선생님이야. 주어진 질문과 정답을 바탕으로 오답들을 뽑아줘야해. 다음은 예시들이야.
         질문: 2022년 월드컵을 개최지는?
         정답: 카타르
         오답: [프랑스, 대한민국, 미국, 영국]

         질문: 축구는 한 팀에 몇 명에 선수로 이루어져 있는가?
         정답: 11명
         오답: [10명, 12명, 9명, 8명]
         """},
        {"role": "user", "content": f'\'다음 질문과 정답에 대해서 오답을 4개 생성해줘 \n 질문: {question} \n 정답: {answer} 오답: '}
    ]
    response = openai.ChatCompletion.create(
        model = model_name,
        messages = messages
    )
    
    #Pre-processing
    response = response['choices'][0]['message']['content']
    response = response[1:-1].split(',')
    response = [word.strip() for word in response]

    return response