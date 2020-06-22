import axios from 'axios'
import {SupportedStockChecker} from './stockChecker'
import {Website} from '../configuration/configuration'

type CurrysStockPosition = {
    status: 'success' | 'fail',
    data: {
        collect: [{
            stockType: 'OUT_OF_STOCK' | 'IN_STOCK'
        }]
    }
}

class CurrysStockChecker implements SupportedStockChecker {
    public readonly alias!: string
    public readonly isSupported = true
    public readonly url!: string
    private readonly productId: string
    private readonly postCode!: string
    private readonly latitude!: string
    private readonly longitude!: string

    constructor(website: Website) {
        Object.assign(this, website)
        const productIdExpression = new RegExp(/\d{6,10}/gm)
        const match = website.url.match(productIdExpression)
        this.productId = match ? match[0] : ''
    }

    public async isInStock(): Promise<boolean> {
        const response = await axios.get(
            `https://www.currys.co.uk/gb/uk/mcd_postcode_check/sProductId/${this.productId}/` +
            `sPostCode/${this.postCode.replace(' ', '')}/` +
            `latitude/${this.latitude}/` +
            `longitude/${this.longitude}/` +
            `ajax.html`)
        const currysResponse = response.data as CurrysStockPosition

        return currysResponse.status === 'success' ?
            currysResponse.data.collect.some((store) => store.stockType === 'IN_STOCK') :
            false
    }
}

export {CurrysStockChecker}
