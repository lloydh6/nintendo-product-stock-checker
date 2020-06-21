import {container as appContainer, injectable, inject} from 'tsyringe'
import {Configuration} from './configuration/configuration'
import registerDependencies from './registerDependencies'
import watchProduct from './watchProduct'

@injectable()
class App {
    constructor(@inject('configuration') private configuration: Configuration) {}

    public watchWebsites() {
        const website = this.configuration.websites[0]

        // Watch the product
        watchProduct(website.url, website.alias)
    }
}

registerDependencies(appContainer)

export {App, appContainer}
