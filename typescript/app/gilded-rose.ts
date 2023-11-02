export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

type IItem = {
  name: string;
  sellIn: number;
  quality: number;
};

type Product = IncreasesQuality | DecreasesQuality | Legendary | Conjured;
type IncreasesQuality = Events | AgingFood;
type Events = {
  _kind: 'Events';
} & IItem;
type AgingFood = {
  _kind: 'AgingFood';
} & IItem;

type DecreasesQuality = {
  _kind: 'DecreasesQuality';
} & IItem;

type Legendary = {
  _kind: 'Legendary';
} & IItem;

type Conjured = {
  _kind: 'Conjured';
} & IItem;

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const products: Array<Product> = this.items.map((item) => {
      switch (item.name) {
        case 'Aged Brie':
          return { _kind: 'AgingFood', ...item };
        case 'Backstage passes to a TAFKAL80ETC concert':
          return { _kind: 'Events', ...item };
        case 'Sulfuras, Hand of Ragnaros':
          return { _kind: 'Legendary', ...item };
        case 'Conjured Mana Cake':
          return { _kind: 'Conjured', ...item };
        default:
          return { _kind: 'DecreasesQuality', ...item };
      }
    });

    products.forEach((product) => {
      if (product._kind === 'Legendary') {
        return;
      }
      if (['AgingFood', 'Events'].includes(product._kind)) {
        if (product._kind === 'AgingFood') {
          const rate = product.sellIn <= 0 ? 2 : 1;
          product.quality += rate;
        } else if (product._kind === 'Events') {
          let rate = 1;
          if (product.sellIn < 11) {
            rate++;
          }
          if (product.sellIn < 6) {
            rate++
          }
          console.log(product.sellIn, rate);
          product.quality += rate;
          if (product.sellIn < 0) {
            product.quality = 0;
          }
        }
      }
      product.sellIn -= 1;
      if (['DecreasesQuality', 'Conjured'].includes(product._kind)) {
        let rate = product._kind === 'Conjured' ? 2 : 1;
        if (product.sellIn < 0) {
          rate *= 2;
        }
        product.quality -= rate;
      }

      if (product.quality > 50) {
        product.quality = 50;
      }
      if (product.quality < 0) {
        product.quality = 0;
      }
    });

    this.items = products.map((product) => ({
      name: product.name,
      sellIn: product.sellIn,
      quality: product.quality,
    }));

    return this.items;
  }
}
