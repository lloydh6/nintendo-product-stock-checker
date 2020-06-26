import {Website} from '../configuration/configuration'

interface SupportedStockChecker extends Website {
    isSupported: true,
    isInStock(): Promise<boolean>
}

interface NotSupportedStockChecker extends Website {
    isSupported: false
}

type StockChecker = SupportedStockChecker | NotSupportedStockChecker

export {StockChecker, SupportedStockChecker, NotSupportedStockChecker}
