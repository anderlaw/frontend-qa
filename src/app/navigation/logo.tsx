export default function Logo() {
    return <div style={{fontSize: '20px',userSelect:'none'}}>
        <span style={{color: '#1e9bd3'}}>前端</span>
        &nbsp;
        <span>.</span>
        <span style={{
            backgroundImage: '-webkit-linear-gradient(left, #a504f1, #edc03c)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent'
        }}>QA</span>
    </div>
}