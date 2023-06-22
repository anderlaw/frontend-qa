import Logo from "@/app/navigation/logo";

export default function NavigationBar() {
    return (
        <nav className="main-nav-container" style={{
            backgroundColor: '#1a1a1b',
            display: 'flex',
            alignItems: 'center',
            color: '#cecdcd',
            userSelect:'none'
        }}>
            <Logo/>
            <ol style={{display: 'flex', height: '60px', lineHeight: '60px', marginLeft: '200px'}}>
                <li>
                    <a href="/html">HTML</a>
                </li>
                <li>
                    <a href="/css">CSS</a>
                </li>
                <li>
                    <a href="/javascript">JavaScript</a>
                </li>
                <li>
                    <a href="/framework">框架</a>
                </li>
            </ol>
        </nav>
    )
}
