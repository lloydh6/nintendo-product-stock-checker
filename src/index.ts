import watchProduct from './watchProduct'

// Get the URL from the args
const productUrl = process.argv[2]

// Get Alias for product to log
const alias = process.argv[3]

// Watch the product
watchProduct(productUrl, alias)
