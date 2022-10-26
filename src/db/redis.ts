import { createClient } from 'redis'

export const redisClient = createClient()

const connectToRedis = async () => {
  await redisClient.connect()
}

connectToRedis()

export const getOrSetCache = (key: string, fetchData: () => Promise<any>) => {
  return new Promise((resolve, reject) => {
    redisClient
      .get(key)
      .then(async (data: string) => {
        if (data != null) return resolve(JSON.parse(data))

        const freshData = await fetchData()

        redisClient.setEx(key, 60, JSON.stringify(freshData))

        resolve(freshData)
      })
      .catch((error) => reject(error))
  })
}
