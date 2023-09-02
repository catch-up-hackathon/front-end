import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { KakaoLogIn } from './pages/login';
import { GetOAuthCode } from './pages/OAuth';
import SimpleSlider from './components/imageSlider';

function App() {
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
            <button className='body_condition_btn'>상태 추가 +</button>
            {/* 모달창 함수 */}
            
          </div>
          </>
        }>

        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
