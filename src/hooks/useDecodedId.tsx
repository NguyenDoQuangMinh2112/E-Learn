import { useSearchParams } from 'react-router-dom'

const useDecodedId = () => {
  const [searchParams] = useSearchParams()
  const encodedId = searchParams.get('id')
  const decodedId = encodedId ? atob(encodedId) : null
  return decodedId
}

export default useDecodedId
