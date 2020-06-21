import 'reflect-metadata'
import {Configuration} from './configuration/configuration'
import {DependencyContainer, instanceCachingFactory} from 'tsyringe'
import {FileConfigurationLoader, ConfigurationLoader} from './configuration/configurationLoader'
import fs from 'fs'

const loadConfiguration = (container: DependencyContainer): Configuration => {
    const configurationLoader = container.resolve<ConfigurationLoader>('configurationLoader')

    return configurationLoader.load()
}

export default (container: DependencyContainer) => {
    container.register('fileSystem', {useValue: fs})
    container.register('argv', {useValue: process.argv})
    container.register('configurationLoader', {useClass: FileConfigurationLoader})
    container.register('configuration', {useFactory: instanceCachingFactory<Configuration>(loadConfiguration)})
}
