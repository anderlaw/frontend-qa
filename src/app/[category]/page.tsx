import HTMLData, {IQAData} from "@/data/html";
import QaCard from "@/app/components/qa-card";

const getQAData = (category:string) => {
    //todo: query data from DB by category
    return new Promise((res, rej) => {
        setTimeout(() => {
            if(category === 'framework'){
                res([])
            }else{
                res(HTMLData)
            }
        }, 1000)
    })
}
export default async function CategoryPage({params}: { params: { category: 'html' | 'css' | 'javascript' } }) {
    const category = params.category
    const data = await getQAData(category) as Array<IQAData>
    return (
        <ol>
            {
                data.map((item, idx) => {
                    return (
                        <QaCard key={idx} {...item}/>
                    )
                })
            }
        </ol>
    )
}

export async function generateStaticParams() {
    // Return a list of possible value for id
    return [
        {
            category:'html'
        },
        {
            category:'css'
        },
        {
            category:'javascript'
        },{
            category:'framework'
        }
    ]
}