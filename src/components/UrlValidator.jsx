import React, { useState } from 'react';
import axios from 'axios';

function URLValidator() {
    const [url, setUrl] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [thumbnail, setThumbnail] = useState('');

    const validateURL = async () => {
        try {
            console.log(url)
        const response = await axios.get(url);
        console.log(response)
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

    return (
        <div>
        {/* <h1>URL Validator</h1> */}
        <input id='input_text'
            type="text"
            placeholder="레시피 링크를 입력해 주세요"
            value={url}
            onChange={handleInputChange}
        />
        <button onClick={validateURL}>URL Check</button>

        {isValid ? (
            <p style={{ color: 'green' }}>Valid URL</p>
        ) : (
            <p style={{ color: 'red' }}>Invalid URL</p>
        )}

        <h2>Thumbnail Preview</h2>
        {thumbnail && <img src={thumbnail} alt="Thumbnail" />}
        </div>
    );
}

export default URLValidator;