import { IApiConfiguration, EnvironmentType, IConfiguration, IEnvironment } from "./common";

export const config: IConfiguration = {
  api: {
    baseSearchUrl: 'https://api.openbrewerydb.org/breweries/search?page=1&per_page=5&query='
  } as IApiConfiguration,
  type: EnvironmentType.PRODUCTION
}

const configPromise = new Promise<{ config: IConfiguration }>((resolve, reject) => {
  resolve({ config })
})

export const environment: IEnvironment = {
  production: true,
  init: configPromise,
  configuration: config
}