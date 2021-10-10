export interface IConfiguration {
    api: IApiConfiguration;
    type: EnvironmentType;
}

export interface IApiConfiguration {
    baseSearchUrl: string
}

export enum EnvironmentType {
    LOCAL,
    PRODUCTION
}

export interface IEnvironment {
    production: boolean;
    init: Promise<{ config: IConfiguration }>
    configuration: IConfiguration;
}

export const ENVIRONMENT: string = 'environment';