import chowdown from 'chowdown';
import createNotification from '../notifications/createNotification';

const watchProduct = async (productUrl, alias) => {
  const scope = chowdown(productUrl);
  const soldOutButtons = await scope.collection('.productAddToBasket-soldOut');

  if (soldOutButtons.length > 0) {
    console.log(`${alias}: ${soldOutButtons[0]} - ${new Date().toString()}`);
    setTimeout(() => {
      watchProduct(productUrl, alias);
    }, 60_000);
  } else {
    createNotification({ title: 'Nintendo Switch Checker', message: 'Product Available!!!', open: productUrl });
  }
}

export default watchProduct;
