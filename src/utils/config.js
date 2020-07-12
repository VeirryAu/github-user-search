import {
  API_DEBUG,
  API_PROTOCOL,
  API_HOST,
  API_PORT,
  API_VERSION,
  API_TOKEN
} from 'react-native-dotenv'

export const debug = API_DEBUG
export const APIPROTOCOL = API_PROTOCOL
export const APIHOST = API_HOST
export const APIPORT = API_PORT
export const APIVERSION = API_VERSION
export const APIURL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}${APIVERSION}`
export const APITOKEN = API_TOKEN
