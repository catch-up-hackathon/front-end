import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { KakaoLogIn } from './pages/login';
import { GetOAuthCode } from './pages/OAuth';
import SimpleSlider from './components/imageSlider';
import URLValidator from './components/UrlValidator';
import axios from 'axios';
// import BottomSheet from './modals/BottomSheet';
import Modal from 'react-modal';
import styled, { css } from "styled-components";


function App() {
  // 알러지 정보 추가 입력을 위한 변수 선언
  const [showInput, setShowInput] = useState(false); // 알레르기 버튼 클릭 시 input태그 상태
  // 알레르기 버튼 클릭 후 input태그 활성화
  const handleButtonClick = () => {
    setShowInput(true);
  };
  // 알레르기 input 값 입력 후 반환
  const [InputValue, setInput] = useState(''); // 알레르기 상세정보 input값 상태
  const saveInputValue = event => {
    setInput(event.target.value);
    console.log(event.target.value);
  };
  // 버튼 클릭 시 색상 변경
  // const [borderColor, setBorderColor] = useState('initialBorderColor'); // 초기 테두리 색 설정
  const [isClicked, setIsClicked] = useState(false); // 클릭 상태 관리
  const handleBtnActive = () => {
    if (isClicked) {
      // 클릭 상태가 true인 경우, 이전 테두리 색과 클릭 상태를 복원합니다.
      // setBorderColor('initialBorderColor');
      console.log(isClicked)
      setIsClicked(false);
    } else {
      // 클릭 상태가 false인 경우, 새로운 테두리 색을 설정하고 클릭 상태를 true로 변경합니다.
      // setBorderColor('newBorderColor');
      console.log(isClicked)
      setIsClicked(true);
    }
  };

  // bottom sheet
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  // '/recipe' 경로에 도달하면 Bottom Sheet를 엽니다.
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === '/recipe') {
      setIsBottomSheetOpen(true);
    }
  }, []);

  // 체크박스
  const [isChecked, setIsChecked] = useState(false);
  const onClickCheck = () => {
      setIsChecked(!isChecked);
      console.log(!isChecked);
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
            <main id='main' style={{}}>
              {/* 헤더(서비스명 표기)
              <header className='home_head' id='home_head_login'>
                <p className='home_main_title'></p>
              </header> */}

              {/* 서비스명 영역 */}
              <section className='service_name_section'>
                {/* <img className='' src='' alt='service_name_img'></img> */}
                <img src='/image/intro_name.svg' alt='service_name_img'></img>
                <div className='service_desc'>당신의 몸을 위한<br/>똑똑한 레시피를 Catch up!</div>
              </section>

              {/* 서비스 아이콘 이미지
              <div>
                <img className='login_img_box' src={"https://cdn-icons-png.flaticon.com/512/5370/5370584.png"} alt='service_icon_img'></img>
              </div> */}

              {/* 소셜 로그인 영역 */}
              <div className='intro_footer'>
                <div id='footer_desc'>소셜 로그인</div>
                <div>
                  <button className='social_login_btn' id='kakao_login_btn' onClick={KakaoLogIn}>
                    <div className='btn_desc'>카카오톡으로 시작하기</div>
                  </button>
                </div>
              </div>
            </main>
          </div>
          </>
        }/>
        
        <Route path='/main' element={
          <>
          <div className='wrap_home'>
            {/* 헤더(서비스명 표기) */}
            <header className='home_head'>
              <div className='home_head_img'>
                <div>
                  <img src='/image/service_name.svg' alt='service_name'></img>
                </div>
                <div>
                  {/* 온클릭 이벤트로 /mypage로 넘거야함 */}
                  <button type='button' id='profile_btn'>
                    <img src='./image/account_circle.svg' alt='profile_img'></img>
                  </button>
                </div>
              </div>
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
              <button className='body_condition_btn'>상태 추가</button>
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
              {showInput && <input id='input_allergie' type='text' value={InputValue} onChange={saveInputValue} placeholder='알레르기를 입력해 주세요' />}
            </div>
          </section>
            <div className='desctipt_section'>
              <div className='header_text' id='header_title'>
                <p>어떤 레시피를 받아볼까요?</p>
              </div>
            </div>

          <section className='health_condition'>
            <button onClick={handleButtonClick}>
              <div id='cond_btn_section'>
                <div>알레르기</div>
                <div className='cond_btn_desc'>어떤 알레르기가 있는지 입력이 필요해요</div>
              </div>
            </button>
            <button onClick={handleBtnActive}>당뇨</button>
            <button onClick={handleBtnActive}>다이어트</button>
            <button onClick={handleBtnActive}>고혈압</button>
            <button disabled='true'>
              <div id='cond_btn_section'>
                <div>애기음식</div>
                <div className='cond_btn_desc'>아직 준비중이에요</div>
              </div>
            </button>
            <button disabled='true'>
              <div id='cond_btn_section'>
                <div>맵찔이</div>
                <div className='cond_btn_desc'>아직 준비중이에요</div>
              </div>
            </button>
            <button disabled='true'>
              <div id='cond_btn_section'>
                <div>비건</div>
                <div className='cond_btn_desc'>아직 준비중이에요</div>
              </div>
            </button>
          </section>
          <button id='condition_btn'>완료</button>
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
          {/* '/recipe' 경로에 도달하면 Bottom Sheet를 엽니다. */}
          <BottomSheet isOpen={isBottomSheetOpen} onClose={() => setIsBottomSheetOpen(false)} />
          {/* 레시피, 재료 헤더 */}
          <header>
            <div>
              <p>요리 이름</p>
            </div>
          </header>
          
          {/* 재료 영역 */}
          <div className='ingredients_section' id='ingredients_section'>
            <button>재료 구매</button>
            변경된 재료 뿌려주기
          </div>

          {/* 레시피 영역 */}
          <div className='recipe_section' id='recipe_section'>
            레시피 리스트 뿌려주기
          </div>
          </>
        }>

        </Route>

        {/* 재료 선택 페이지 */}
        <Route path='/wishlist' element={
          <>
          <header>
            {/* 뒤로가기 버튼 */}

            {/* desc */}
            구매를 원하는 재료를 선택해주세요
          </header>
          <section id='wishlist_section'>
            <div>
              <SCustomCheckboxWrapper>
                <SCustomCheckbox type="checkbox" isChecked={isChecked} />오이
                <SCustomLabel onClick={onClickCheck} isChecked={isChecked} />
              </SCustomCheckboxWrapper>
            </div>
          </section>
          <button id='wishlist_btn'>확인</button>
          </>
        }>

        </Route>

        {/* 재료 구매 페이지 */}
        <Route path='/cart' element={
          <>
          <header>
            {/* 뒤로가기 버튼 */}

            {/* desc */}
            재료 구매
          </header>
          <section id='cart_section'>
            <div>
            {/* 재료 이름 */}
            {/* 상품 이미지 */}
            {/* 상품 이름 */}
            {/* 상품 가격 */}
            {/* 다른 상품 보기(a태그) */}
            {/* 수량, 수량조절버튼 */}
            </div>
          </section>
          <button id='cart_btn'>11번가에서 구매</button>
          </>
        }>

        </Route>

        {/* 재료 선택 페이지 */}
        <Route path='/replacement' element={
          <>
          <div></div>
          </>
        }>

        </Route>
      </Routes>
      
    </div>
  );
}

export default App;

// recipe 페이지 로드 시 모달창 작동
const BottomSheet = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false} // 모달 렌더링 관련 경고를 제거하기 위해 필요합니다.
      overlayClassName="modal-overlay" // overlayClassName을 추가하여 배경을 어둡게 만듭니다.
      contentClassName="modal-content" // 커스텀 스타일 클래스 적용
    >
      {/* Bottom Sheet 내용 */}
      <header>
        <button onClick={onClose}>닫기</button>
        <p id='bottom_sheet_header'>(유저이름)님을 위해<br/>케첩이 바꾼 재료들이에요</p>
      </header>
      <section className='bottom_sheet_content'>
        <div>
          바뀐 재료 뿌려주기
        </div>
      </section>
    </Modal>
  );
};

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


function Ingredients() {
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
  
  const urlParams = new URLSearchParams(window.location.search);
  const user_id = urlParams.get('user_id');

  // axios.get('url'+user_id)
  // .then
  document.getElementById('ingredients_section').innerHTML+=`
  <form action="" accept-charset="utf-8" method="get">
    <button class=>
      <div>
      </div>
    </button>
  </form>
  `
}

// 체크박스용
const SCustomCheckboxWrapper = styled.div`
  position: relative;
  text-align: left;
  margin-left: 8px;
  font-family: 'Pretendard';
  font-size: 16px;
  font-weight: 600;
`;

const SCustomCheckbox = styled.input`
    visibility: hidden;
    ${({ isChecked }) =>
        isChecked
            ? css`
                  background-color: #FF3B30;
                  border-color: #FF3B30;
                  &:after: {
                      opacity: 1;
                  }
              `
            : null}
`;

const SCustomLabel = styled.label`
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    left: 87vw;
    top: -0.5px;
    ${({ isChecked }) => {
        return isChecked
            ? css`
                  background-color: #FF3B30;
                  border-color: #FF3B30;
                  &:after {
                      border: 2px solid #fff;
                      border-top: none;
                      border-right: none;
                      content: "";
                      height: 4px;
                      left: 5px;
                      position: absolute;
                      top: 6px;
                      transform: rotate(-45deg);
                      width: 8px;
                  }
              `
            : css`
                  background-color: #fff !important;
                  &:after {
                      opacity: 1;
                  }
              `}}
`;