import 'reflect-metadata'
import {Configuration} from './configuration/configuration'
import {createFactory} from './stockCheckerFactory'
import {CurrysStockChecker} from './stockCheckers/currysStockChecker'
import {DependencyContainer, instanceCachingFactory} from 'tsyringe'
import {FileConfigurationLoader, ConfigurationLoader} from './configuration/configurationLoader'
import fs from 'fs'
import {MultipleStockChecker} from './stockCheckers/multipleStockChecker'
import {OutOfStockChecker} from './stockCheckers/outOfStockChecker'

const loadConfiguration = (container: DependencyContainer): Configuration => {
    const configurationLoader = container.resolve<ConfigurationLoader>('configurationLoader')

    return configurationLoader.load()
}

export default (container: DependencyContainer) => {
    container.register('fileSystem', {useValue: fs})
    container.register('argv', {useValue: process.argv})
    container.register('configurationLoader', {useClass: FileConfigurationLoader})
    container.register('configuration', {useFactory: instanceCachingFactory<Configuration>(loadConfiguration)})
    container.register('stockChecker', {useClass: MultipleStockChecker})
    container.register('stockCheckerFactory', {useValue: createFactory([
        [
            'http(s?):\/\/store.nintendo.co.uk',
            (website) => new OutOfStockChecker(website, '.productAddToBasket-soldOut'),
        ], [
            'http(s?):\/\/www.currys.co.uk',
            (website) => new CurrysStockChecker(website),
        ], [
            'http(s?):\/\/ao.com',
            (website) => new OutOfStockChecker(website, '.back-in-stock'),
        ],
    ])})
}
