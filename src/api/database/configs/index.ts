// import { config } from "dotenv";
// config();

const nodeEnv = process.env.NODE_ENV || 'development';

export interface MongoDbOptions {
    useNewUrlParser: boolean,
    useUnifiedTopology: boolean,
    useCreateIndex: boolean,
    useFindAndModify: boolean
}

interface Db {
    mongoDbOptions: MongoDbOptions
    sample: string
    mongoLocalURI: string
    mongoCloudURI: string
    mongoProdDbURI: () => string
    mongoDevDbURI: () => string,
    mongoDatabaseURI: () => string 
}

interface Configs {
    db: Db 
}
const configs: Configs = {
    db: {
        mongoDbOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        },
        sample: `mongodb+srv://<db_username>:<db_password>@cluster0.vzv7opy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
        mongoLocalURI: `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.MONGO_DB_NAME}`,
        mongoCloudURI: `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER_HOST}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
        mongoProdDbURI: function (): string {
            return this.mongoCloudURI;
        },
        mongoDevDbURI: function (): string {
            return this.mongoLocalURI;
        },
        /**
         * sets database URI according to environment nodejs is running in
         */
        mongoDatabaseURI: function (): string {
            // return nodeEnv === 'production' ? this.mongoProdDbURI() : this.mongoDevDbURI();
            return this.mongoProdDbURI();
        }
    },
}
export default configs;