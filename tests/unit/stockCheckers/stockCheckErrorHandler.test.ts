import {SupportedStockChecker} from '../../../src/stockCheckers/stockChecker'
import {StockCheckErrorHandler} from '../../../src/stockCheckers/stockCheckErrorHandler'

describe('StockCheckerErrorHandler', () => {
    test('has same URL as decorated instance', () => {

    })

    test('has same alias as decorated instance', () => {

    })

    test('returns isInStock from decorated instance', () => {

    })

    test('does nothing when no error is found', async () => {
        const spy = jest.spyOn(console, 'log')

        const decoratorInstance: SupportedStockChecker = {
            url: 'some url',
            alias: 'my alias',
            isSupported: true,
            isInStock: () => Promise.resolve(true),
        }
        const decorator = new StockCheckErrorHandler(decoratorInstance)

        await decorator.isInStock()

        expect(spy)
            .not.toHaveBeenCalled()
    })

    test('reports when a product is no longer found', async () => {
        const spy = jest.spyOn(console, 'log')

        const decoratedInstance: SupportedStockChecker = {
            url: 'some url',
            alias: 'my alias',
            isSupported: true,
            isInStock: async () => {
                throw new Error('Request failed with status code 404')
            },
        }
        const decorator = new StockCheckErrorHandler(decoratedInstance)

        await decorator.isInStock()

        expect(spy)
            .toHaveBeenCalledWith(
                decoratedInstance.alias + ' not found. Check configuration.')
    })

    test('reports when it encounters an error', () => {

    })
})
