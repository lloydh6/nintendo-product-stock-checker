import {inject, injectable, injectAll} from 'tsyringe'
import {Configuration} from './configuration'

export interface ConfigurationLoader {
    load(): Configuration
}

@injectable()
export class FileConfigurationLoader implements ConfigurationLoader {
    private readonly fileName: string;

    constructor(@inject('fileSystem') private fileSystem, @inject('argv') argv?: string[]) {
        this.fileName = (argv ? argv[2] : undefined) || './config.json'
    }

    load(): Configuration {
        if (!this.fileSystem.existsSync(this.fileName)) {
            throw Error('Configuration file has not been found or specified.')
        }

        const configuration = this.fileSystem.readFileSync(this.fileName)
        return JSON.parse(configuration)
    }
}
