
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
    "websites": [
        {
            "url": "https://store.nintendo.co.uk/nintendo-switch-console/nintendo-switch-with-grey-joy-con-controllers/12245184.html",
            "alias": "Nintendo Switch Grey"
        }, {
            "url": "https://www.currys.co.uk/gbuk/tv-and-home-entertainment/gaming/gaming-consoles/microsoft-xbox-one-x-with-forza-horizon-4-lego-speed-champions-10202173-pdt.html",
            "alias": "Xbox One X (Forza Horizons 4)",
            "postCode": "M1 3BR",
            "latitude": "53.477193",
            "longitude": "-2.2334403"
        }, {
            "url": "https://ao.com/product/cyv00465-xbox-one-console-black-71959-291.aspx",
            "alias": "AO.com - Xbox One X (Forza Horizons 4)"
        }
    ]
}
```

Start the stocker checker with:

```bash
yarn start
```

## Supported Websites

* [Nintendo Store](https://store.nintendo.co.uk/)
* [Currys](https://www.currys.co.uk)
* [AO.com](https://ao.com/)
* [Ooni Oven Store](https://uk.ooni.com/)
