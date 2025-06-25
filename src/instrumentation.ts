import connectToDatabase, { dbTypes } from '@/api/database/lib'

export async function register() {
    await connectToDatabase(dbTypes.mongoDB);
}