import {SupportedStockChecker, NotSupportedStockChecker} from './stockChecker'

class SupportedStockCheckLogger implements SupportedStockChecker {
    public readonly alias: string
    public readonly isSupported = true
    public readonly url: string

    constructor(private loggedInstance: SupportedStockChecker) {
        this.alias = loggedInstance.alias
        this.url = loggedInstance.url
    }

    async isInStock(): Promise<boolean> {
        const isInStock = await this.loggedInstance.isInStock()

        console.log(`${this.alias}:\n\tIn Stock? ${isInStock}\t${new Date().toString()}`)

        return isInStock
    }
}

class NotSupportedStockCheckLogger implements NotSupportedStockChecker {
    public readonly alias!: string
    public readonly isSupported = false
    public readonly url!: string

    constructor(stockChecker: NotSupportedStockChecker) {
        Object.assign(this, stockChecker)
        console.log(`${this.alias}: Not Supported`)
    }
}

export {SupportedStockCheckLogger, NotSupportedStockCheckLogger}
