import Logo from "@/app/navigation/logo";

export default function NavigationBar() {
    return (
        <nav style={{
            backgroundColor: 'grey',
            display:'flex',
            alignItems:'center'
        }}>
            <Logo/>
            <ol style={{display: 'flex', height: '60px', lineHeight: '60px',marginLeft:'200px'}}>
                <li>
                    <a href="/html" style={{display: 'inline-block'}}>HTML</a>
                </li>
                <li style={{marginLeft: '40px'}}>
                    <a href="/css">CSS</a>
                </li>
                <li style={{marginLeft: '40px'}}>
                    <a href="/javascript">JavaScript</a>
                </li>
                <li style={{marginLeft: '40px'}}>
                    <a href="/framework">框架</a>
                </li>
            </ol>
        </nav>
    )
}
