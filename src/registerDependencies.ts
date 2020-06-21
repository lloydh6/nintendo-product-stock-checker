import 'reflect-metadata'
import {Configuration} from './configuration/configuration'
import {DependencyContainer, instanceCachingFactory} from 'tsyringe'
import {FileConfigurationLoader, ConfigurationLoader} from './configuration/configurationLoader'
import fs from 'fs'
import {OutOfStockChecker} from './stockCheckers/outOfStockChecker'
import {SupportedStockCheckLogger} from './stockCheckers/stockCheckLogger'
import {StockCheckNotifier} from './stockCheckers/stockCheckNotifier'
import {createNotification} from './notifications/notifcationFactory'

const loadConfiguration = (container: DependencyContainer): Configuration => {
    const configurationLoader = container.resolve<ConfigurationLoader>('configurationLoader')

    return configurationLoader.load()
}

export default (container: DependencyContainer) => {
    container.register('fileSystem', {useValue: fs})
    container.register('argv', {useValue: process.argv})
    container.register('configurationLoader', {useClass: FileConfigurationLoader})
    container.register('configuration', {useFactory: instanceCachingFactory<Configuration>(loadConfiguration)})
    container.register('stockChecker', {useFactory: (c) => {
        const config = c.resolve<Configuration>('configuration')
        const stockChecker = new OutOfStockChecker(config.websites[0], '.productAddToBasket-soldOut')

        return new StockCheckNotifier(
            new SupportedStockCheckLogger(stockChecker),
            createNotification)
    }})
}
