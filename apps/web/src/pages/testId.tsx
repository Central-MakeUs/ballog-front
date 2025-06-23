import { useParams } from 'react-router-dom'

const TestId = () => {
  const { id } = useParams<{ id: string }>()
  return <div>아이딩: {id}</div>
}

export default TestId
