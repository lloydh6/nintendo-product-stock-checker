
# product-stock-checker

Get alerted when a Nintendo product becomes available again. Based on [lloydh6/nintendo-product-stock-checker](https://github.com/lloydh6/nintendo-product-stock-checker).

## Prerequisites

* [NodeJS](https://nodejs.org/)
* [yarn](https://yarnpkg.com/)

### Step 1

Resolve the projects dependencies by running `yarn install`

### Step 2

Start the watcher with the following command

`yarn start [config file]`

[config file] _optional_ - configuration file name


### Example config.json

If you are wanting to watch for this product [https://store.nintendo.co.uk/nintendo-switch-console/nintendo-switch-with-grey-joy-con-controllers/12245184.html](https://store.nintendo.co.uk/nintendo-switch-console/nintendo-switch-with-grey-joy-con-controllers/12245184.html) then your `config.json` should be:

```json
{
    "websites": [{
            "url": "https://store.nintendo.co.uk/nintendo-switch-console/nintendo-switch-with-grey-joy-con-controllers/12245184.html",
            "alias": "Nintendo-Switch-Grey"
        }
    ]
}
```

Start the stocker checker with:

```bash
yarn start
```
