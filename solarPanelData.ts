export interface WarrantyPeriod {
  year: number;
  powerPercentage: number; // as decimal, e.g. 0.9 for 90%
}

export interface SolarPanel {
  manufacturer: string;
  model: string;
  wp: number;
  price: number;
  currency: string;
  warranty: WarrantyPeriod[];
  storeUrl: string;
  score: number;
}

const calculateScore = (panel: Pick<SolarPanel, 'wp' | 'price' | 'warranty'>) => {
  let previousYear = 0;
  const guaranteedEnergy = panel.warranty.reduce((total, period) => {
    const kW = panel.wp / 1000; // convert Wp to kW
    const kWhPerYear = kW * period.powerPercentage * 8760;
    const totalKWhForPeriod = kWhPerYear * (period.year - previousYear);
    previousYear = period.year;
    return total + totalKWhForPeriod;
  }, 0)
  return guaranteedEnergy / panel.price;
};

export const solarPanelData: SolarPanel[] = [
  {
    manufacturer: 'Trina Solar',
    model: 'Vertex S+ TSM-445NEG9R.28 445 Wp BFR',
    wp: 445,
    price: 82,
    currency: 'EUR',
    warranty: [
      ...Array.from({ length: 29 }, (_, i) => ({year: i + 1, powerPercentage: 0.99 - (i * 0.004)})),
      { year: 30, powerPercentage: 0.84 }
    ],
    storeUrl: 'https://www.photovoltaik4all.de/trina-vertex-s-tsm-445neg9r.28-445-wp-doppelglas'
  },
  {
    manufacturer: 'Heckert Solar',
    model: 'NeMo® 2.0 60 M 330 Watt (5BB)',
    wp: 330,
    price: 78,
    currency: 'EUR',
    warranty: [
      { year: 10, powerPercentage: 0.9 },
      { year: 25, powerPercentage: 0.8 },
    ],
    storeUrl: 'https://www.photovoltaik4all.de/heckert-solar-nemo-2-0-60m-330-wp-mono'
  },
  {
    manufacturer: 'Meyer Burger',
    model: 'White 395',
    wp: 395,
    price: 106,
    currency: 'EUR',
    warranty: [
      ...Array.from({ length: 25 }, (_, i) => ({year: i + 1, powerPercentage: 0.98 - (i * 0.0025)})),
    ],
    storeUrl: 'https://www.photovoltaik4all.de/heckert-solar-nemo-2-0-60m-330-wp-mono'
  },
  {
    manufacturer: 'Luxor',
    model: 'ECO LINE N-Type Glas-Glas BiFacial M108 LX-440M (16BB) TOPCon',
    wp: 440,
    price: 89,
    currency: 'EUR',
    warranty: [
      ...Array.from({ length: 30 }, (_, i) => ({year: i + 1, powerPercentage: 0.97 - (i * 0.00345)})),
    ],
    storeUrl: 'https://www.photovoltaik4all.de/luxor-eco-line-n-type-glas-glas-bifacial-m108-lx-440m-16bb-topcon'
  },
  {
    manufacturer: 'Heckert Solar',
    model: 'NeMo® 3.0 120 M 380 Watt (MC4)',
    wp: 380,
    price: 68,
    currency: 'EUR',
    warranty: [
      { year: 10, powerPercentage: 0.9 },
      { year: 25, powerPercentage: 0.8 },
    ],
    storeUrl: 'https://www.photovoltaik4all.de/heckert-solar-nemo-3-0-120-m-380'
  },
  {
    manufacturer: 'Jinko',
    model: 'Tiger Neo JKM440N-54HL4R-B - 440Wp (Fullblack)',
    wp: 440,
    price: 74,
    currency: 'EUR',
    warranty: [
      ...Array.from({ length: 30 }, (_, i) => ({year: i + 1, powerPercentage: 0.99 - (i * 0.004)})),
    ],
    storeUrl: 'https://www.photovoltaik4all.de/pv4all-deal/jinko-tiger-neo-jkm440n-54hl4r-b-440wp-fullblack/JIN33240'
  },
  {
    manufacturer: 'Trina Solar',
    model: 'Vertex S+ TSM-455NEG9R.28 455 Wp BFR (Doppelglas)',
    wp: 455,
    price: 76,
    currency: 'EUR',
    warranty: [
      ...Array.from({ length: 29 }, (_, i) => ({year: i + 1, powerPercentage: 0.99 - (i * 0.0035)})),
      { year: 30, powerPercentage: 0.84 }
    ],
    storeUrl: 'https://www.photovoltaik4all.de/trina-vertex-s-tsm-455neg9r.28-455-wp-bfr-doppelglas'
  },
  {
    manufacturer: 'SOLAR4AMERICA',
    model: 'S4AU-144S',
    wp: 550,
    price: 341,
    currency: 'USD',
    warranty: [
      { year: 1, powerPercentage: 0.97 },
      { year: 10, powerPercentage: 0.9 },
      { year: 25, powerPercentage: 0.8 },
    ],
    storeUrl: 'https://www.gogreensolar.com/products/solar4america-550w-solar-panel'
  },
  {
    manufacturer: 'ZNShine Solar',
    model: 'ZXM7-SH108-405/M',
    wp: 405,
    price: 247,
    currency: 'USD',
    warranty: [
      { year: 1, powerPercentage: 0.98 },
      { year: 10, powerPercentage: 0.92 },
      { year: 25, powerPercentage: 0.84 },
    ],
    storeUrl: 'https://www.gogreensolar.com/products/znshine-solar-405-watt-mono-108-cell-all-black'
  },
  {
    manufacturer: 'qcells',
    model: 'Q.PEAK-DUO-ML-G10+410',
    wp: 410,
    price: 332,
    currency: 'USD',
    warranty: [
      { year: 1, powerPercentage: 0.98 },
      { year: 10, powerPercentage: 0.935 },
      { year: 25, powerPercentage: 0.86 },
    ],
    storeUrl: 'https://www.gogreensolar.com/products/znshine-solar-405-watt-mono-108-cell-all-black'
  },
  {
    manufacturer: 'ALEXUS',
    model: 'ALEX-390~410-B-54-S',
    wp: 400,
    price: 145,
    currency: 'USD',
    warranty: [
      ...Array.from({ length: 25 }, (_, i) => ({year: i + 1, powerPercentage: 0.98 - (i * 0.0054167)})),
    ],
    storeUrl: 'https://www.santansolar.com/product/alexus-solar-400w-mono-solar-panel/'
  },
  {
    manufacturer: 'GStar',
    model: 'MARS GSP6G60M-380BT',
    wp: 360,
    price: 89.99,
    currency: 'USD',
    warranty: [
      ...Array.from({ length: 30 }, (_, i) => ({year: i + 1, powerPercentage: 0.99 - (i * 0.0045)})),
    ],
    storeUrl: 'https://www.santansolar.com/product/g-star-360w-120hc-bob-solar-panel/'
  },
].map(panel => ({
  ...panel,
  score: calculateScore(panel)
})); 

console.log(solarPanelData.at(-1)?.warranty)