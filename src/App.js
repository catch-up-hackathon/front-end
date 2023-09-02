import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { KakaoLogIn } from './pages/login';
import { GetOAuthCode } from './pages/OAuth';
import SimpleSlider from './components/imageSlider';
import URLValidator from './components/UrlValidator';
import axios from 'axios';

function App() {
  const [showInput, setShowInput] = useState(false);
  const handleButtonClick = () => {
    setShowInput(true);
  };

  return (
    <div className="App">
      {/* 페이지 구분 */}
      <Routes>
        {/* 카카오 로그인 인증페이지 */}
        <Route path='/oauth' element={<><GetOAuthCode></GetOAuthCode></>}/>

        {/* 인트로(소셜 로그인) */}
        <Route path='/' element={
          <>
          <div className='wrap_home'>
            {/* 헤더(서비스명 표기) */}
            <header className='home_head' id='home_head_login'>
              <p className='home_main_title'></p>
            </header>

            {/* 서비스명 이미지 */}
            <div>
              {/* <img className='' src='' alt='service_name_img'></img> */}
              <p>케첩</p>
            </div>

            {/* 서비스 아이콘 이미지 */}
            <div>
              <img className='login_img_box' src={"https://cdn-icons-png.flaticon.com/512/5370/5370584.png"} alt='service_icon_img'></img>
            </div>

            {/* 소셜 로그인 버튼 */}
            <button className='social_login_btn' id='kakao_login_btn' onClick={KakaoLogIn}>카카오 로그인</button>

          </div>
          </>
        }/>
        
        <Route path='/main' element={
          <>
          <div className='wrap_home'>
            {/* 헤더(서비스명 표기) */}
            <header className='home_head'>
              <p className='home_main_title'>케첩</p>
            </header>

            {/* description */}
            <div className='home_desc'>
              <p className='home_desc_detail'>당신의 몸을 위한<br></br>똑똑한 레시피를 Catch up!</p>
            </div>

            {/* 튜토리얼 이미지 슬라이드 영역 */}
            <div>
              <SimpleSlider />
            </div>

            {/* 건강상태 추가 버튼 */}
            <form action='/condition' acceptCharset='utf-8' method='get'>
              <button className='body_condition_btn'>상태 추가 +</button>
            </form>
            
          </div>
          </>
        }>
        </Route>
        
        {/* 건강상태 페이지 */}
        {/* TODO 백엔드로 건강상태 데이터 보내야함, 알레르기 입력 후 완료버튼 활성화 */}
        {/* TODO 아무런 질환도 없으면 어떻게 다음페이지 넘어가야하나? */}
        <Route path='/condition' element={
          <>
          <header>
            {/* 이전 페이지 버튼 */}
            <div className='pre_page' id='pre_page'>

            </div>
          </header>

            {/* description */}
          <section className='new_input_section'>
            <div className='input_here'>
              {/* showInput이 true일 때만 input 태그를 표시 */}
              {showInput &&
                <div className='header_text' id='header_text'>
                  <p>어떤 알레르기가 있나요?</p>
                </div>
              }
              {showInput && <input type='text' placeholder='입력하세요' />}
            </div>
          </section>
            <div className='desctipt_section'>
              <div className='header_text' id='header_title'>
                <p>어떤 레시피를 받아볼까요?</p>
              </div>
            </div>

          <section className='health_condition'>
            <button onClick={handleButtonClick}>
              알레르기
              <p>어떤 알레르기가 있는지 입력이 필요해요</p>
            </button>
            <button>당뇨</button>
            <button>다이어트</button>
            <button>고혈압</button>
            <button disabled='true'>
              애기음식
              <p>아직 준비중이에요</p>
            </button>
            <button disabled='true'>
              맵찔이
              <p>아직 준비중이에요</p>
            </button>
            <button disabled='true'>
              비건
              <p>아직 준비중이에요</p>
            </button>
          </section>
          </>
        }
        >
        </Route>

        {/* 링크 입력 페이지 */}
        {/* TODO 레시피 보기 누르면 백엔드로 유튜브 링크 보내기 */}
        {/* TODO 링크 입력하면 정상작동 url인지 체크하기 + 정상이면 썸네일 보이기 */}
        {/* TODO 레시피 입력시 레시피 보기 버튼 활성화 */}
        <Route path='/url' element={
          <>
          <header>
            {/* 이전 페이지 버튼 */}
            <div className='pre_page' id='pre_page'>

            </div>

            <div className='desctipt_section'>
              <div className='header_text' id='header_title'>
                <p>어떤 레시피를 궁금한가요?</p>
              </div>
              <div className='header_text' id='header_desc'>
                <p>유튜브와 블로그에서 봤던 레시피의 링크를 복사해서 입력해 주세요</p>
              </div>
            </div>
          </header>
          <section className='content'>
            <div>
              {/* <input type='text' placeholder='레시피 링크를 입력해 주세요' onFocus="this.placeholder = ''" /> */}
              <URLValidator />
            </div>
            <button>레시피 보기</button>
          </section>
          </>
        }>
        </Route>

        {/* 레시피, 재료 페이지 */}
        <Route path='/recipe' element={
          <>
          {/* 레시피, 재료 헤더 */}
          <header>
            <div>
              <p></p>
            </div>
          </header>
          
          {/* 재료 영역 */}
          <section>

          </section>

          {/* 레시피 영역 */}
          <section>

          </section>
          </>
        }>

        </Route>
      </Routes>
      
    </div>
  );
}

export default App;

function request_ingredients_info(place_id, user_id) {
  axios.post('https://place.o2o.kr/api/v1/card/detail'+'?place_id='+place_id)
  .then((response)=> {
    var app_id = 'Apps';
    console.log(response)

    
    var test_data =[ 
    {
      "status" : true,
      "data" : {
        "food_name" : "박선우 손맛 탕수육",
        "bad" : ['설탕', '식초', '전분'],
        "good" : ['스테비아', '사과식초', '감자전분'],
        "ingredients" : ['고기 (등심)', '당근', '오이', '목이버섯', '파인애플', '양파 (선택)', '완두콩 (선택)', '달걀 흰자', '마른 전분', '물', '간장', '스테비아', '사과식초', '물 감자전분'],
        "recipe" : [
            '고기를 약간 편으로 썰어줍니다.',
            '당근을 살짝 잘라서 칼집을 내줍니다.',
            '오이를 약간 길쭉하게 썰어줍니다.',
            '파인애플을 4등분 또는 6등분 합니다.',
            '목이버섯을 크게 잘라줍니다.',
            '양파와 완두콩은 선택적으로 사용하며, 적당한 크기로 썰어줍니다.',
            '달걀 흰자를 넣어 튀김옷을 만듭니다.',
            '마른 전분에 물을 조금씩 섞어가며 튀김옷을 만듭니다.',
            '고기를 넣고 튀겨줍니다.',
            '튀긴 고기를 건져서 튀김옷을 제거합니다.',
            '소스를 만들기 위해 물, 간장, 스테비아, 사과식초, 물 감자전분을 넣고 섞어줍니다.',
            '튀긴 고기를 소스에 넣고 섞어줍니다.',
            '접시에 담아 완성합니다.'
          ]
        }
      }]
    
    // 데이터 출력
    var response_data = response.data;
    var recipe_info = response_data['data'][0]
    console.log('response_data :', typeof response_data, response_data)
    
    // 데이터 파싱
    let food_name = response_data['food_name']
    let bad_ingrds = response_data['bad'] // 리스트
    let good_ingrds = response_data['good'] // 리스트
    let ingredients = response_data['ingredients'] // 리스트
    let recipe = response_data['recipe'] // 리스트
    console.log('response data parse')
    }
  )
}


// function