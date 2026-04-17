import axios from 'axios'

import { CodewarsData } from '@/common/types/codewars'

export async function getCodewarsServices() {
  const username = process.env.CODEWARS_USERNAME || process.env.NEXT_PUBLIC_USER_ID

  if (!username) {
    return null
  }

  const response = await axios.get(`https://www.codewars.com/api/v1/users/${username}`)
  return response.data as CodewarsData
}
