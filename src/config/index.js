export { default as swaggerConfig } from './swagger.config.js'
import { config } from 'dotenv';
config();

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const { DB_URI, PORT, JWT_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, BUCKET_NAME, PERSPECTIVE_API_KEY, GEOCODING_API_KEY, STRAVA_REFRESH_TOKEN, STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } = process.env

export const port = PORT || 3000;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const dbUri = DB_URI;
export const awsAccessKey = AWS_ACCESS_KEY_ID;
export const awsSecretAccessKey = AWS_SECRET_ACCESS_KEY;
export const awsRegion = AWS_REGION;
export const bucketName = BUCKET_NAME;
export const perspectiveAPIkey = PERSPECTIVE_API_KEY;
export const geocodingAPIkey = GEOCODING_API_KEY;
export const stravaClientId = STRAVA_CLIENT_ID;
export const stravaClientSecret = STRAVA_CLIENT_SECRET;
export const stravaRefreshToken = STRAVA_REFRESH_TOKEN;
export const prefix = '/api';
export const specs = "/docs";