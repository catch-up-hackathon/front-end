import React, { useState } from "react";

function ButtonColor() {
    const data = [1, 2, 3];

    const [btnActive, setBtnActive] = useState("");

    const toggleActive = (e) => {
        setBtnActive((prev) => {
        return e.target.value;
        });
    };

    return (
        <div className="container">
        {data.map((item, idx) => {
            return (
            <>
                <button
                value={idx}
                className={"btn" + (idx === btnActive ? " active" : "")}
                onClick={toggleActive}
                >
                {item}
                </button>
            </>
            );
        })}
        </div>
    );
}

export default ButtonColor;