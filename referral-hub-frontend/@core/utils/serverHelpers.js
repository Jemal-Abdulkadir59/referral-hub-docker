import 'server-only'

// Next Imports
import { cookies } from 'next/headers'

// Config Imports
import themeConfig from '../../configs/themeConfig'

export const getSettingsFromCookie = async () => {
  const cookieStore = await cookies()
  const cookieName = themeConfig.settingsCookieName

  return JSON.parse(cookieStore.get(cookieName)?.value || '{}')
}

export const getMode = async () => {
  const settingsCookie = await getSettingsFromCookie()
  return settingsCookie.mode || themeConfig.mode
}

export const getSystemMode = () => {
  const mode = getMode()

  return mode
}

export const getServerMode = () => {
  const mode = getMode()

  return mode
}
