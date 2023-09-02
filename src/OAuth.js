import axios from 'axios';

export function GetOAuthCode () {
    let code = new URL(window.location.href).searchParams.get('code');
    console.log('code : ', code);
    // return code

    // send parameter to backend
    axios.get('http://localhost:3000/api/v1/kakao_oauth'+'?kakao_code='+code)
    .then((response)=>{
        console.log('OAuth response : ', response)

        // user_id 추출 및 다음페이지 전송
        const user_id = response.data.data[0].user_id;
        console.log('user_id : ', user_id);
        window.location.replace("/home?user_id="+user_id);

    })
    // 예외처리
    .catch(()=>{
        console.log('false')
        alert('잘못된 접근');
        window.location.replace('/');
    })
}