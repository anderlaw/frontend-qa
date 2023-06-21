import HTMLData from "@/data/html";

export default function CategoryPage({params}: { params: { category: 'html' | 'css' | 'javascript' } }) {
    const category = params.category
    const renderData = category === 'html' ? HTMLData : []
    console.log('server runs')
    return (
        <ol>
            {
                renderData.map((item, idx) => {
                    return (<li key={idx}>
                        {item.title}
                    </li>)
                })
            }
        </ol>
    )
}
