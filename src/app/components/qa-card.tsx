"use client"
import {useRef} from 'react';
import {IQAData} from "@/data/html";

export default function QaCard({question, answer, tips}:IQAData) {
    const iconRef = useRef(null)
    const answerDIVRef = useRef(null)
    const answerVisibleRef = useRef(false)
    const handleSwitchAnswerVisible = () => {
        if (answerDIVRef.current != null) {
            const temp = answerVisibleRef.current = !answerVisibleRef.current
            if (temp) {
                (answerDIVRef.current as any).style.display = 'block';
                (iconRef.current as any).classList.add('active')
            } else {
                (answerDIVRef.current as any).style.display = 'none';
                (iconRef.current as any).classList.remove('active')
            }
        }
    }
    return <div style={{
        padding: '14px',
        borderRadius: '6px',
        lineHeight:1.6,
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }}>
        <p>
            <span style={{fontWeight: 'bold'}}>Q:&nbsp;</span>
            <span>{question}</span>
            <a onClick={handleSwitchAnswerVisible}
               style={{userSelect: 'none', marginLeft: '10px', color: '#0b4ead', cursor: 'pointer'}}>
                <span>参考答案</span>
                <svg ref={iconRef} xmlns="http://www.w3.org/2000/svg" className="arrow-icon"
                     width="18" height="18px"
                     viewBox="0 0 1024 1024" version="1.1">
                    <path
                        d="M728.223744 520.22784a42.467328 42.467328 0 0 1-11.393024 20.503552L374.90688 882.65728c-16.662528 16.662528-43.677696 16.662528-60.340224 0s-16.662528-43.677696 0-60.340224L626.449408 510.43328 314.614784 198.598656c-16.662528-16.662528-16.662528-43.677696 0-60.340224 16.661504-16.662528 43.676672-16.662528 60.3392 0L716.879872 480.18432c10.860544 10.860544 14.642176 26.120192 11.343872 40.04352z"
                        fill="#323233"/>
                </svg>
            </a>
        </p>
        <div ref={answerDIVRef} className="answer-container" style={{display: 'none',marginTop:'8px'}}>
            <p>
                <span style={{fontWeight: 'bold'}}>A:&nbsp;</span>
                <span>{answer}</span>
            </p>
            {
                tips && <p>
                    <span style={{color: "#449144"}}>tips：</span>
                    <span>{tips}</span>
                </p>
            }
        </div>
    </div>

}