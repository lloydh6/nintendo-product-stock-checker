import axios from 'axios'
import chowdown from 'chowdown'
import {SupportedStockChecker} from './stockChecker'
import {Website} from '../configuration/configuration'

class OutOfStockChecker implements SupportedStockChecker {
    public readonly isSupported = true
    public readonly url!: string;
    public readonly alias!: string;

    constructor(website: Partial<Website>, private outOfStockSelector: string) {
        Object.assign(this, website)
    }

    async isInStock(): Promise<boolean> {
        const webpage = await axios(this.url)
        const scope = chowdown.body(webpage.data)
        const outOfStockInstances = await scope.collection(this.outOfStockSelector)

        return outOfStockInstances.length === 0
    }
}

export {OutOfStockChecker}
