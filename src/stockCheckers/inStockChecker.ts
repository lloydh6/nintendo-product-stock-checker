import axios from 'axios'
import chowdown from 'chowdown'
import {SupportedStockChecker} from './stockChecker'
import {Website} from '../configuration/configuration'

class InStockChecker implements SupportedStockChecker {
    public readonly isSupported = true
    public readonly url!: string;
    public readonly alias!: string;

    constructor(website: Partial<Website>, private inStockSelector: string) {
        Object.assign(this, website)
    }

    async isInStock(): Promise<boolean> {
        const webpage = await axios(this.url)
        const scope = chowdown.body(webpage.data)
        const inStockInstances = await scope.collection(this.inStockSelector)

        return inStockInstances.length > 0
    }
}

export {InStockChecker}
