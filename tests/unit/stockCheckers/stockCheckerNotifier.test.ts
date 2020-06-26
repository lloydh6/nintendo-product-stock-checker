import {Autofixture} from 'ts-autofixture/dist/src'
import {SupportedStockChecker} from '../../../src/stockCheckers/stockChecker'
import {StockCheckNotifier} from '../../../src/stockCheckers/stockCheckNotifier'

const fixture = new Autofixture()

test('has same URL as decorated instance', () => {
    const decoratedInstance: SupportedStockChecker = {
        url: fixture.create({url: 'sample'}).url,
        alias: 'alias',
        isSupported: true,
        isInStock: () => Promise.resolve(true)}
    const decorator = new StockCheckNotifier(decoratedInstance, (_) => {})

    expect(decorator.url).toBe(decoratedInstance.url)
})

test('has same alias as decorated instance', () => {
    const decoratedInstance: SupportedStockChecker = {
        url: 'url',
        alias: fixture.create({alias: 'sample'}).alias,
        isSupported: true,
        isInStock: () => Promise.resolve(true)}
    const decorator = new StockCheckNotifier(decoratedInstance, (_) => {})

    expect(decorator.alias).toBe(decoratedInstance.alias)
})

test('returns isInStock from decorated instance', async () => {
    const expectedIsInStock = fixture.create({isInStock: true}).isInStock
    const decoratedInstance: SupportedStockChecker = {
        url: 'url',
        alias: 'alias',
        isSupported: true,
        isInStock: () => Promise.resolve(expectedIsInStock)}
    const decorator = new StockCheckNotifier(decoratedInstance, (_) => {})

    const isInStock = await decorator.isInStock()

    expect(isInStock).toBe(expectedIsInStock)
})

test('notifies when isInStock returns true', async () => {
    const mockNotifier = jest.fn()
    const testCase = fixture.create({url: 'url', alias: 'alias'})
    const decoratedInstance: SupportedStockChecker = {
        url: testCase.url,
        alias: testCase.alias,
        isSupported: true,
        isInStock: () => Promise.resolve(true)}
    const decorator = new StockCheckNotifier(decoratedInstance, mockNotifier)

    await decorator.isInStock()

    expect(mockNotifier).toBeCalledWith({
        title: 'Product Stock Checker',
        message: testCase.alias + ' Available',
        open: testCase.url})
})

test('does not notify when isInStock returns false', async () => {
    const mockNotifier = jest.fn()
    const testCase = fixture.create({url: 'url', alias: 'alias'})
    const decoratedInstance: SupportedStockChecker = {
        url: testCase.url,
        alias: testCase.alias,
        isSupported: true,
        isInStock: () => Promise.resolve(false)}
    const decorator = new StockCheckNotifier(decoratedInstance, mockNotifier)

    await decorator.isInStock()

    expect(mockNotifier).not.toBeCalled()
})
