export default function CategoryLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{
      margin:'40px auto 0',
      width:'700px'
    }}> {children} </div>
  )
}
