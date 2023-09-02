export function KakaoLogIn() {
    console.log('KakaoLogIn 진입')
    const REST_API_KEY = '35a032bb568c308129bf95d2041fabf2';
    const REDIRECT_URI = 'http://localhost:3000/oauth/';
    const KAKAO_AUTH_URL = `
    https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&
    redirect_uri=${REDIRECT_URI}&response_type=code
    `

    window.location.href = KAKAO_AUTH_URL;
    console.log('window.location.href : ', window.location.href);
}