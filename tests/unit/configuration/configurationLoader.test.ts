import 'reflect-metadata'
import {FileConfigurationLoader} from '../../../src/configuration/configurationLoader'
import fs from 'fs'
import {mocked} from 'ts-jest/utils'
import {Autofixture} from 'ts-autofixture/dist/src'

jest.mock('fs')
const fixture = new Autofixture()
const exampleWebsite = {url: '', alias: ''}
const exampleConfiguration = {websites: exampleWebsite}
const mockedFileSystem = mocked(fs, true)

test('throws exception when no configuration file is found or specified', () => {
    mockedFileSystem.existsSync.mockReturnValue(false)

    const loader = new FileConfigurationLoader(mockedFileSystem)

    expect(() => loader.load()).toThrowError()
})

test('loads \'config.json\' if no configuration file is specified at the command line', () => {
    mockedFileSystem.existsSync.mockReturnValue(true)
    mockedFileSystem.readFileSync.mockReturnValue(JSON.stringify({}))

    const expectedFileName = './config.json'
    const loader = new FileConfigurationLoader(mockedFileSystem)

    loader.load()

    expect(mockedFileSystem.readFileSync).toHaveBeenLastCalledWith(expectedFileName)
})

test('loads configuration file specified at the command line', () => {
    mockedFileSystem.existsSync.mockReturnValue(true)
    mockedFileSystem.readFileSync.mockReturnValue(JSON.stringify({}))

    const expectedFileName = fixture.create({value: ''}).value
    const loader = new FileConfigurationLoader(mockedFileSystem, ['ignored', 'ignored', expectedFileName])

    loader.load()

    expect(mockedFileSystem.readFileSync).toHaveBeenLastCalledWith(expectedFileName)
})

test('loads contents of configuration file', () => {
    const expected = fixture.create(exampleConfiguration)
    mockedFileSystem.readFileSync.mockReturnValue(JSON.stringify(expected))

    const loader = new FileConfigurationLoader(mockedFileSystem)
    const actual = loader.load()

    expect(actual).toEqual(expected)
})
