import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { likes, mockLikeApi } from './api/mock';

const ReactQueryLikeCounter = () => {
  const queryClient = useQueryClient();

  const { data: dbLikes } = useQuery({
    queryKey: ['likes'],
    queryFn: () => likes,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await mockLikeApi();
      return response;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(['likes']);

      const previousLikes = queryClient.getQueryData<number>(['likes']);

      queryClient.setQueriesData(['likes'], (previousLikes || 0) + 1);

      return { previousLikes };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['likes'], () => context?.previousLikes);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['likes']);
    },
  });

  return (
    <div>
      <p>Likes: {dbLikes}</p>
      <button onClick={() => mutate()} disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Like'}
      </button>
    </div>
  );
};

export default ReactQueryLikeCounter;
