const logout = {
    name: 'logout',
    type: 'Succeed!',
    resolve: async ({context: {user, accessToken}}) => {
        try {
            // await redis.set(`expiredToken:${accessToken}`, user._id, 'EX', process.env.REDIS_TOKEN_EXPIRY);

            return {succeed: true};
        } catch (error) {
            return Promise.reject(error);
        }
    }
};

export default logout;