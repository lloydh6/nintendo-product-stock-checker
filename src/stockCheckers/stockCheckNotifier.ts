import {SupportedStockChecker} from './stockChecker'
import {NotificationFactory} from '../notifications/notifcationFactory'

class StockCheckNotifier implements SupportedStockChecker {
    public readonly alias!: string
    public readonly isSupported = true
    public readonly url!: string

    constructor(private notifiedInstance: SupportedStockChecker, private createNotification: NotificationFactory) {
        Object.assign(this, notifiedInstance)
    }

    async isInStock(): Promise<boolean> {
        const isInStock = await this.notifiedInstance.isInStock()

        if (isInStock) {
            this.createNotification({
                title: 'Product Stock Checker',
                message: `${this.alias} Available`,
                open: this.url})
        }

        return isInStock
    }
}

export {StockCheckNotifier}
