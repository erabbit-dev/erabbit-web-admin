import { requestGet, requestPost } from '@/utils/request'
import { Path } from './path'
import type { User } from '@/types/user'

export const loginService = (username: string, password: string) =>
  requestPost<{ token: string }>(Path.USER_LOGIN, { username, password })

export const getProfileService = () => requestGet<User>(Path.USER_PROFILE)
