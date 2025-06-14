import { writeFileSync } from 'fs';
import { solarPanelData, type SolarPanel } from './solarPanelData';

function formatCurrency(price: number, currency: string): string {
  return Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
}

function formatWarranty(warranty: SolarPanel['warranty']): string {
  const longest = warranty.sort((a, b) => a.year - b.year).at(-1)
  return longest ? `${longest.year}y @ ${(longest.powerPercentage * 100).toFixed(1)}%` : 'N/A'
}

function generateMarkdown(panels: SolarPanel[]): string {
  // Sort by score descending (best first)
  const sortedPanels = [...panels].sort((a, b) => b.score - a.score);
  
  let markdown = `# Solar Panel Leaderboard 🌞

*Ranked by Score*

| Panel | Watts | Price | Score | Warranty | Store |
|-------|-------|-------|-------|----------|-------|
`;

  sortedPanels.forEach((panel, index) => {
    const panelName = `**${panel.manufacturer}** ${panel.model}`;
    const watts = `${panel.wp}W`;
    const price = formatCurrency(panel.price, panel.currency);
    const score = panel.score.toFixed(2);
    const store = `[Buy ↗](${panel.storeUrl})`;
    const warranty = formatWarranty(panel.warranty);
    markdown += `| ${panelName} | ${watts} | ${price} | ${score} | ${warranty} | ${store} |\n`;
  });
  
  markdown += `\n## Methodology

**Score Calculation:** Score = Total Guaranteed Energy (kWh) ÷ Price

- **Total Guaranteed Energy** is calculated by summing up the energy production over all warranty periods
- For each warranty period: kWh = (Panel Watts-Peak ÷ 1000) × Power Percentage × 8760 hours × Years
- Higher scores indicate better value for money
- Note that this is guaranteed energy, under standard test conditions, not real world performance. Only use it to compare between panels, not to predict real world performance.

## Legend

- [Watts-peak aka Nominal Power](https://en.wikipedia.org/wiki/Nominal_power_(photovoltaic)#Standard_test_conditions): The nominal power of PV devices is measured under standard test conditions (STC), specified in standards such as IEC 61215, IEC 61646 and UL 1703. Specifically, the light intensity is 1000 W/m2, with a spectrum similar to sunlight hitting the Earth's surface at latitude 35°N in the summer (airmass 1.5), the temperature of the cells being 25 °C. The power is measured while varying the resistive load on the module between an open and closed circuit (between maximum and minimum resistance). The highest power thus measured is the 'nominal' power of the module in watts.

---
*Generated on ${new Date().toISOString().split('T')[0]}*
`;

  return markdown;
}

function main(): void {
  try {
    writeFileSync('README.md', generateMarkdown(solarPanelData));
    console.log('✅ Leaderboard generated: README.md');
  } catch (error) {
    console.error('❌ Error generating leaderboard:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
