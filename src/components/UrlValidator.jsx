import React, { useState } from 'react';
import axios from 'axios';

function URLValidator() {
    const [url, setUrl] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [thumbnail, setThumbnail] = useState('');

    const validateURL = async () => {
        try {
            console.log(url)
        // 임시로 모두 다 200인 상태로 만듦
        // const response = await axios.get(url);
        // console.log(response)
        const response = {'status':200} 
        // 유효한 URL일 때
        if (response.status === 200) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
        } catch (error) {
        // 유효하지 않은 URL일 때
        setIsValid(false);
        }
    };

    const fetchThumbnail = async () => {
        try {
        const response = await axios.get(url);
        if (response.data.image) {
            setThumbnail(response.data.image);
        } else {
            setThumbnail('');
        }
        } catch (error) {
        console.error('Error fetching thumbnail:', error);
        setThumbnail('');
        }
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setUrl(inputValue);
        setIsValid(false); // URL이 변경되면 유효성 검사 재실행
    };

    const handleSendData = () => {
        const queryString = `?url=${encodeURIComponent(url)}`;
        const backendURL = 'http://127.0.0.1:5000/url'; // 실제 백엔드 엔드포인트로 변경
        // 백엔드에 url 넘겨주고 레시피 받아옴
        fetch(`${backendURL}${queryString}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Enter 키를 눌렀을 때 handleSendData 함수 호출
            handleSendData();
        }
    };

    return (
        <div>
        {/* <h1>URL Validator</h1> */}
        <input id='input_text'
            type="text"
            placeholder="레시피 링크를 입력해 주세요"
            value={url}
            onChange={handleInputChange}
            onKeyPress={(e) => {
                validateURL(e);
                handleKeyPress(e);
            }} // Enter 키 이벤트 처리
        />
        {/* <button onClick={validateURL}>URL Check</button> */}

        {isValid ? (
            <p style={{ color: 'green' }}>올바른 링크입니다</p>
        ) : (
            <p style={{ color: 'red' }}>올바른 링크를 입력해 주세요</p>
        )}

        {/* <h2>Thumbnail Preview</h2> */}
        <section className='thumbnail_section' id='thumbnail_section'>
            {thumbnail && <img src={thumbnail} alt="Thumbnail" />}
        </section>
        </div>
    );
}

export default URLValidator;

