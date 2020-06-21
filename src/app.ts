import {container as appContainer, injectable, inject} from 'tsyringe'
import registerDependencies from './registerDependencies'
import {SupportedStockChecker} from './stockChecker'

@injectable()
class App {
    constructor(@inject('stockChecker') private stockChecker: SupportedStockChecker) {}

    public async start(): Promise<void> {
        const isInStock = await this.stockChecker.isInStock()

        if (!isInStock) {
            setTimeout(() => {
                this.start()
            }, 60_000)
        }
    }
}

registerDependencies(appContainer)

export {App, appContainer}
