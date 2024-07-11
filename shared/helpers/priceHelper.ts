export default class PriceHelper {
  static getPriceWithDiscount(price: number, discount: number, count: number = 1) {
    const discountValue = this.getDiscountValue(price, discount);
    const priceWithDiscount = (price - discountValue) * count;
    return +(priceWithDiscount.toFixed(2));
  }
  static getDiscountValue(price: number, discount: number, count: number = 1) {
    const oneItemDiscount = +((price * discount) / 100).toFixed(2);
    return +(((oneItemDiscount) * count).toFixed(2));
  }
}
