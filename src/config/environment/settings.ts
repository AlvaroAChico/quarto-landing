import settingsEnv from "./settings-env.json"
import settingsDEV from "./development.json"
import settingsINT from "./integration.json"
import settingsPROD from "./production.json"

const settingsMap = {
  dev: settingsDEV,
  int: settingsINT,
  prod: settingsPROD,
}

const env = settingsEnv.environment.toLowerCase() as keyof typeof settingsMap
const selectedSettings = settingsMap[env] || settingsDEV

const {
  app: { name, mocks, local },
  api: { base, auth },
  cloudEnv,
} = selectedSettings

export const settingsApp = {
  app: {
    name,
    mocks,
    local,
  },
  api: {
    base,
    auth,
  },
  environment: cloudEnv || "development",
}
