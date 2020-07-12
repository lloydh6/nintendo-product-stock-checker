import {SupportedStockChecker} from './stockChecker'

class StockCheckErrorHandler implements SupportedStockChecker {
    public readonly alias!: string
    public readonly isSupported = true
    public readonly url!: string

    constructor(private errorHandledInstance: SupportedStockChecker) {
        this.url = 'some url'
    }

    async isInStock(): Promise<boolean> {
        try {
            await this.errorHandledInstance.isInStock()
        } catch (error) {
            console.log('my alias not found. Check configuration.')
        }
        return false
    }
}

export {StockCheckErrorHandler}
