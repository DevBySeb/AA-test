import { IApiConfiguration, EnvironmentType, IConfiguration, IEnvironment } from "./common";

export const config: IConfiguration = {
  api: {
    baseSearchUrl: 'https://api.openbrewerydb.org/breweries/search?page=1&per_page='
  } as IApiConfiguration,
  type: EnvironmentType.LOCAL
}

const configPromise = new Promise<{ config: IConfiguration }>((resolve, reject) => {
  resolve({ config })
})

export const environment: IEnvironment = {
  production: false,
  init: configPromise,
  configuration: config
}
