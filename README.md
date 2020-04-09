
# nintendo-product-stock-checker

Get alerted when a Nintendo product becomes available again. 

## Prerequisites
* [NodeJS](https://nodejs.org/)
* [yarn](https://yarnpkg.com/)

### Step 1
Resolve the projects dependencies by running `yarn install`

### Step 2
Start the watcher with the following command

`yarn start <product-url> <product-alias>`

The `<product-url>` string is the URL to the product that you want to monitor. 

The `<product-alias>` string is the name you want to display in the terminal for the product you are watching.

### Example
If you are wanting to watch for this product [https://store.nintendo.co.uk/nintendo-switch-console/nintendo-switch-with-grey-joy-con-controllers/12245184.html](https://store.nintendo.co.uk/nintendo-switch-console/nintendo-switch-with-grey-joy-con-controllers/12245184.html) then you would run the following command:

`yarn start https://store.nintendo.co.uk/nintendo-switch-console/nintendo-switch-with-grey-joy-con-controllers/12245184.html Nintendo-Switch-Grey`

