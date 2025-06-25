
import RedisStore from 'connect-redis'; 
import redisInterface from './lib/redis';
import usersCacheInterface from './interface/user';

const sessionStorePrefix = "userSession:";
const redisStore = new RedisStore({
    client: redisInterface.getClient(),
    prefix: sessionStorePrefix,
});

// TODO... connect to redis database
// redisInterface.connect();

export {
    usersCacheInterface,
    redisStore,
    sessionStorePrefix,
}