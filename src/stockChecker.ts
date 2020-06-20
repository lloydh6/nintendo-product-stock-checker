import {container as stockCheckingContainer, injectable, inject} from 'tsyringe'
import {Configuration} from './configuration/configuration'
import {ConfigurationLoader} from './configuration/configurationLoader'
import registerDependencies from './registerDependencies'
import watchProduct from './watchProduct'

@injectable()
class StockChecker {
    private readonly configuration: Configuration;

    constructor(@inject('configurationLoader') configurationLoader: ConfigurationLoader) {
        this.configuration = configurationLoader.load()
    }

    public watch() {
        const website = this.configuration.websites[0]

        // Watch the product
        watchProduct(website.url, website.alias)
    }
}

registerDependencies(stockCheckingContainer)

export {StockChecker, stockCheckingContainer}
