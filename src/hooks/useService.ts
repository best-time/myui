import { request } from '@/lib/request'

export function useApi(pathUrl) {
  const data = ref<any>(null)
  const loading = ref<boolean>(false)

  const fetchData = async (params): Promise<any> => {
    loading.value = true
    try {
      data.value = await request.get(pathUrl, { params })
    } finally {
      loading.value = false
    }
  }

  return { data, loading, fetchData }
}

const { data, loading, fetchData } = useApi('/api/data')

console.log(data, loading)
fetchData({ id: 123 })
