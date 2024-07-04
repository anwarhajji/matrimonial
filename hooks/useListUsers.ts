import { getUserslist } from '@/actions/userdata'
import { useQuery } from '@tanstack/react-query'

export const useListUsers = () => {
  const { data, isLoading, error, refetch, isFetching, isFetched } = useQuery({
    queryKey: ['listusers'],
    queryFn: async () => await getUserslist()
  })
  if (error) {
    console.log(error)
  }
  return { data, isLoading, error, isFetching, isFetched }
}
