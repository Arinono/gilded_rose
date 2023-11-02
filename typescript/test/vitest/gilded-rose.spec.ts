import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('decreases in quality', () => {
    const gildedRose = new GildedRose([
      new Item('Elexir of the Mongoose', 5, 7),
      new Item('Elexir of the Mongoose', 3, 7),
    ]);
    let items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
    expect(items[0].sellIn).toBe(4);
    expect(items[1].quality).toBe(6);
    expect(items[1].sellIn).toBe(2);
    items = gildedRose.updateQuality();
    expect(items[1].quality).toBe(5);
    expect(items[0].quality).toBe(5);
    items = gildedRose.updateQuality();
    expect(items[1].quality).toBe(4);
    expect(items[0].quality).toBe(4);
    items = gildedRose.updateQuality();
    expect(items[1].quality).toBe(2);
    expect(items[0].quality).toBe(3);
    items = gildedRose.updateQuality();
    expect(items[1].quality).toBe(0);
    expect(items[0].quality).toBe(2);
    expect(items[0].sellIn).toBe(0);

    // dbl drop
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    // never < 0
    items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it('increases in quality', () => {
    const gr = new GildedRose([
      new Item("Aged Brie", 2, 0),
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 2),
    ]);
    let items = gr.updateQuality();

    expect(items[0].quality).toBe(1);
    expect(items[0].sellIn).toBe(1);
    expect(items[1].quality).toBe(3);
    expect(items[1].sellIn).toBe(10);
    items = gr.updateQuality();

    expect(items[0].quality).toBe(2);
    expect(items[0].sellIn).toBe(0);
    expect(items[1].quality).toBe(5);
    expect(items[1].sellIn).toBe(9);
    items = gr.updateQuality();

    expect(items[0].quality).toBe(4);
    expect(items[0].sellIn).toBe(-1);
    items = gr.updateQuality();

    expect(items[0].quality).toBe(6);
    expect(items[0].sellIn).toBe(-2);
    expect(items[1].quality).toBe(9);
    expect(items[1].sellIn).toBe(7);
    items = gr.updateQuality();
    items = gr.updateQuality();
    items = gr.updateQuality();
    expect(items[1].quality).toBe(16);
    expect(items[1].sellIn).toBe(4);
    items = gr.updateQuality();
    items = gr.updateQuality();
    items = gr.updateQuality();
    items = gr.updateQuality();
    expect(items[1].quality).toBe(28);
    expect(items[1].sellIn).toBe(0);
    items = gr.updateQuality();
    expect(items[1].quality).toBe(0);
    expect(items[1].sellIn).toBe(-1);
  });

  it('never goes above 50', () => {
    const gr = new GildedRose([
      new Item("Aged Brie", 5, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
    ]);
    let items = gr.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(50);
    items = gr.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[1].quality).toBe(50);
  });

  it('ragnaros never changes', () => {
    const gr = new GildedRose([
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
    ]);
    let items = gr.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
    items = gr.updateQuality();
    expect(items[0].quality).toBe(80);
    expect(items[0].sellIn).toBe(0);
  });
});
