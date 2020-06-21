import {Configuration} from '../configuration/configuration'
import {inject, injectable} from 'tsyringe'
import {SupportedStockChecker, StockChecker} from './stockChecker'
import {StockCheckerFactory} from '../stockCheckerFactory'

@injectable()
class MultipleStockChecker implements SupportedStockChecker {
    private readonly stockCheckers: StockChecker[]
    public readonly isSupported = true
    public readonly url = '(multiple)'
    public readonly alias: string

    constructor(@inject('configuration') configuration: Configuration,
        @inject('stockCheckerFactory') createStockChecker: StockCheckerFactory) {
        this.alias = configuration.websites.map((website) => website.alias).join(', ')
        this.stockCheckers = configuration.websites.map(createStockChecker)
    }

    async isInStock(): Promise<boolean> {
        const isInStockAnywhere = await Promise.all(
            this.stockCheckers
                .map((stockChecker) => stockChecker.isSupported ?
                    stockChecker.isInStock() :
                    Promise.resolve(false)))

        return isInStockAnywhere.some((isInStock) => isInStock)
    }
}

export {MultipleStockChecker}
