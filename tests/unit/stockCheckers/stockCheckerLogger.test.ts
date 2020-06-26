import {Autofixture} from 'ts-autofixture/dist/src'
import {SupportedStockChecker, NotSupportedStockChecker} from '../../../src/stockCheckers/stockChecker'
import {SupportedStockCheckLogger, NotSupportedStockCheckLogger} from '../../../src/stockCheckers/stockCheckLogger'

describe('SupportedStockCheckLogger', () => {
    const fixture = new Autofixture()

    test('has same URL as decorated instance', () => {
        const decoratedInstance: SupportedStockChecker = {
            url: fixture.create({url: 'sample'}).url,
            alias: 'alias',
            isSupported: true,
            isInStock: () => Promise.resolve(true)}
        const decorator = new SupportedStockCheckLogger(decoratedInstance)

        expect(decorator.url).toBe(decoratedInstance.url)
    })

    test('has same alias as decorated instance', () => {
        const decoratedInstance: SupportedStockChecker = {
            url: 'url',
            alias: fixture.create({alias: 'sample'}).alias,
            isSupported: true,
            isInStock: () => Promise.resolve(true)}
        const decorator = new SupportedStockCheckLogger(decoratedInstance)

        expect(decorator.alias).toBe(decoratedInstance.alias)
    })

    test('returns isInStock from decorated instance', async () => {
        const expectedIsInStock = fixture.create({isInStock: true}).isInStock
        const decoratedInstance: SupportedStockChecker = {
            url: 'url',
            alias: 'alias',
            isSupported: true,
            isInStock: () => Promise.resolve(expectedIsInStock)}
        const decorator = new SupportedStockCheckLogger(decoratedInstance)

        const isInStock = await decorator.isInStock()

        expect(isInStock).toBe(expectedIsInStock)
    })

    test('logs stock check result to the console', async () => {
        const spy = jest.spyOn(console, 'log')

        const testCase = fixture.create({url: 'url', alias: 'alias', isInStock: true})
        const decoratedInstance: SupportedStockChecker = {
            url: testCase.url,
            alias: testCase.alias,
            isSupported: true,
            isInStock: () => Promise.resolve(testCase.isInStock)}
        const decorator = new SupportedStockCheckLogger(decoratedInstance)

        await decorator.isInStock()

        expect(spy)
            .toHaveBeenCalledWith(
                decoratedInstance.alias +
                ':\n\tIn Stock? ' +
                testCase.isInStock +
                '\t' +
                new Date().toString())

        spy.mockRestore()
    })
})

describe('NotSupportedStockCheckLogger', () => {
    const fixture = new Autofixture()
    const template: NotSupportedStockChecker = {
        url: 'url',
        alias: 'alias',
        isSupported: false,
    }

    test('has same URL as decorated instance', () => {
        const decoratedInstance: NotSupportedStockChecker = fixture.create(template)
        const decorator = new NotSupportedStockCheckLogger(decoratedInstance)

        expect(decorator.url).toBe(decoratedInstance.url)
    })

    test('has same alias as decorated instance', () => {
        const decoratedInstance: NotSupportedStockChecker = fixture.create(template)
        const decorator = new NotSupportedStockCheckLogger(decoratedInstance)

        expect(decorator.alias).toBe(decoratedInstance.alias)
    })

    test('logs \'Not Supported\' to the console', () => {
        const spy = jest.spyOn(console, 'log')

        const decoratedInstance: NotSupportedStockChecker = fixture.create(template)
        new NotSupportedStockCheckLogger(decoratedInstance)

        expect(spy).toHaveBeenCalledWith(decoratedInstance.alias + ': Not Supported')

        spy.mockRestore()
    })
})
