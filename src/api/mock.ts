type LikeApiResponse = {
  success: boolean;
  totalLikes: number;
};

// from db
export let likes = 0;

export const mockLikeApi = () => {
  return new Promise<LikeApiResponse>((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.7) {
        reject(new Error('API Error'));
      } else {
        likes += 1;
        resolve({
          success: true,
          totalLikes: likes,
        });
      }
    }, 1000);
  });
};
