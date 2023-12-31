import openai
import os

openai.api_key = os.environ.get("OPENAI_API_KEY")

def Extract_extract(document, model_name, n_words):
    messages = [
        {"role": "system", "content": """너는 객관식 문제를 출제하는 선생님이야. 주어진 지문에서 키워드를 뽑아줘. 다음은 지문에서 키워드를 뽑아낸 예시야:
         
         지문: "양자역학은 분자, 원자, 전자, 소립자 등 미시적인 계의 현상을 다루는 즉, 작은 크기를 갖는 계의 현상을 연구하는 물리학의 분야이다. 또는 아원자 입자 및 입자 집단을 다루는 현대 물리학의 기초 이론이다. 
         '아무리 기이하고 터무니없는 사건이라 해도, 발생 확률이 0이 아닌 이상 반드시 일어난다'는 물리학적 아이디어에 기초한다.
         양자역학의 양자는 물리량에 기본 단위가 있으며, 그 기본 단위에 정수배만 존재한다는 뜻을 담고 있다. 현대 물리학의 기초인 양자역학은 컴퓨터의 주요 부품인 반도체의 원리를 설명해 주고, "물질의 운동이 본질적으로 비결정론적인가?" 라는 의문을 제기하며 과학기술, 철학, 문학, 예술 등 다방면에 중요한 영향을 미쳐 20세기 과학사에서 빼놓을 수 없는 중요한 이론으로 평가된다.
         19세기 중반까지의 실험은 뉴턴의 고전역학으로 설명할 수 있었다. 그러나, 19세기 후반부터 20세기 초반까지 이루어진 전자, 양성자, 중성자 등의 아원자 입자와 관련된 실험들의 결과는 고전역학으로 설명을 시도할 경우 모순이 발생하여 이를 해결하기 위한 새로운 역학 체계가 필요하게 되었다. 이 양자역학은 플랑크의 양자 가설을 계기로 하여 슈뢰딩거, 하이젠베르크, 디랙 등에 의해 만들어진 전적으로 20세기에 이루어진 학문이다. 양자역학에서 플랑크 상수를 0으로 극한을 취하면 양자역학이 고전역학으로 수렴하는데, 이를 대응 원리라 한다."

         키워드: [양자역학, 양자, 반도체, 플랑크, 뉴턴, 하이젠베르크, 20세기, 대응 원리]

         지문: 1989년 2월 15일 여의도 농민 폭력 시위를 주도한 혐의(폭력행위등처벌에관한법률위반)으로 지명수배되었다. 1989년 3월 12일 서울지방검찰청 공안부는 임종석의 사전구속영장을 발부받았다. 같은 해 6월 30일 평양축전에 임수경을 대표로 파견하여 국가보안법위반 혐의가 추가되었다. 경찰은 12월 18일~20일 사이 서울 경희대학교에서 임종석이 성명 발표를 추진하고 있다는 첩보를 입수했고, 12월 18일 오전 7시 40분 경 가스총과 전자봉으로 무장한 특공조 및 대공과 직원 12명 등 22명의 사복 경찰을 승용차 8대에 나누어 경희대학교에 투입했다. 1989년 12월 18일 오전 8시 15분 경 서울청량리경찰서는 호위 학생 5명과 함께 경희대학교 학생회관 건물 계단을 내려오는 임종석을 발견, 검거해 구속을 집행했다. 임종석은 청량리경찰서에서 약 1시간 동안 조사를 받은 뒤 오전 9시 50분 경 서울 장안동의 서울지방경찰청 공안분실로 인계되었다.

         키워드: [1989년 2월 15일, 여의도, 임종석, 경희대학교, 국가보안법위반]
         """},
        {"role": "user", "content": f'\'다음 지문에 대해서 키워드를 {n_words}개 뽑아줘 \n 지문: {document} 키워드: '}
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