import 'reflect-metadata'
import {DependencyContainer} from 'tsyringe'
import {FileConfigurationLoader, ConfigurationLoader} from './configuration/configurationLoader'
import fs from 'fs'

export default (container: DependencyContainer) => {
    container.register('fileSystem', {useValue: fs})
    container.register('argv', {useValue: process.argv})
    container.register('configurationLoader', {useClass: FileConfigurationLoader})
}
