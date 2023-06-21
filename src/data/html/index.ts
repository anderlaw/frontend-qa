interface QAData {
    title: string
    description?: string
    answer: string
}
const HTMLData: QAData [] = [
    {
        title: 'HTML语义化是什么意思',
        answer:'HTML语义化指赋予HTML标签一定的语法结构意义，这种意义除了在开发时有一定的意义，避免一些标签的滥用如一些早期的网站中使用div+span布局开发整个网站，还给搜索引擎提供帮助更好地理解网站的内容'
    }
]
export default HTMLData