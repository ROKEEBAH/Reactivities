import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import agent from '../api/agent';

export const useActivities = () => {
     const queryClient = useQueryClient();
     const {data: activities, isPending} = useQuery({
  queryKey: ['activities'],
  queryFn: async () => {
    const response = await agent.get<Activity[]>('/activities');
    return response.data;
  }
  });


  const updateActivity = useMutation({
    mutationFn: async (activity:Activity) => {
      const response = await agent.put<Activity>('/activities', activity);
    return response.data;
        // await agent.put('/activities', activity)
    }, 
    onSuccess: async () => {
       await queryClient.invalidateQueries({
        queryKey: ['activities']
        });  
    }
  
  });
  return {
    activities, 
    isPending,
    updateActivity
  }
}