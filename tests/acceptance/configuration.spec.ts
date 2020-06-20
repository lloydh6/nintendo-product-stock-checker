import 'reflect-metadata'
import {Autofixture} from 'ts-autofixture/dist/src'
import fs from 'fs'
import {mocked} from 'ts-jest/utils'
import {StockChecker, stockCheckingContainer} from '../../src/stockChecker'

jest.mock('fs')
const mockedFileSystem = mocked(fs, true)
const fixture = new Autofixture()
const exampleWebsite = {url: '', alias: ''}
const exampleConfiguration = {websites: exampleWebsite}

stockCheckingContainer.register('fileSystem', {useValue: mockedFileSystem})

describe('Configuration', () => {
    const configuration = fixture.create(exampleConfiguration)
    mockedFileSystem.readFileSync.mockReturnValue(JSON.stringify(configuration))

    it('Reports an error when a configuration file isn\'t found or specified', () => {
        mockedFileSystem.existsSync.mockReturnValue(false)

        expect(() => stockCheckingContainer.resolve(StockChecker))
            .toThrowError('Configuration file has not been found or specified.')
    })

    it('Loads \'config.json\'', () => {
        mockedFileSystem.existsSync.mockReturnValue(true)
        stockCheckingContainer.resolve(StockChecker)

        expect(fs.readFileSync).toHaveBeenCalledWith('./config.json')
    })

    it('Loads configuration from a filename specified in the arguments', () => {
        const expectedFileName = fixture.create({value: ''}).value

        mockedFileSystem.existsSync.mockReturnValue(true)
        stockCheckingContainer.register('argv', {useValue: ['ignored', 'ignored', expectedFileName]})

        stockCheckingContainer.resolve(StockChecker)

        expect(mockedFileSystem.readFileSync).toHaveBeenCalledWith(expectedFileName)
    })
})
