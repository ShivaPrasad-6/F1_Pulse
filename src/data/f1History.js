export const f1Timeline = [
  {
    era: '1950-1959',
    title: 'The Championship Begins',
    summary:
      'Formula 1 started in 1950 with Alfa Romeo dominating early, Juan Manuel Fangio becoming the sport\'s first defining champion, and classic venues like Silverstone and Monza shaping the calendar.',
    highlights: ['First season in 1950', 'Fangio won 5 titles', 'Front-engined cars defined the decade'],
  },
  {
    era: '1960-1969',
    title: 'Rear-Engine Revolution',
    summary:
      'Cooper and Lotus made rear-engine designs the standard. The decade also brought rapid technical innovation, commercial growth, and more global reach.',
    highlights: ['Jim Clark era', 'Lotus transformed chassis design', 'Aerodynamics started to matter'],
  },
  {
    era: '1970-1979',
    title: 'Commercial Expansion and Ground Effect',
    summary:
      'Teams became more professional, sponsorship grew, and Lotus pioneered ground effect. The era mixed innovation with major safety concerns.',
    highlights: ['Emerson Fittipaldi and Niki Lauda titles', 'Ground-effect innovation', 'Safety campaigning intensified'],
  },
  {
    era: '1980-1989',
    title: 'Turbo Power and Legendary Rivalries',
    summary:
      'Turbocharged engines pushed performance to extremes. Rivalries involving Prost, Senna, Piquet, and Mansell helped define F1’s global popularity.',
    highlights: ['Turbo engines peaked', 'McLaren and Williams dominance', 'Prost vs Senna took shape'],
  },
  {
    era: '1990-1999',
    title: 'Senna, Schumacher, and the Modern TV Era',
    summary:
      'Electronics, active suspension, and refined aerodynamics changed car behavior. Schumacher\'s rise and Ferrari\'s rebuild started a new competitive chapter.',
    highlights: ['Senna-Prost climax', 'Safety reforms after 1994', 'Schumacher titles with Benetton'],
  },
  {
    era: '2000-2009',
    title: 'Ferrari Dominance and Technical Arms Race',
    summary:
      'Michael Schumacher and Ferrari defined the early 2000s, while later years saw Renault, McLaren, and Brawn challenge the order with major rule shifts.',
    highlights: ['Ferrari won 5 straight driver titles with Schumacher', 'Hybrid-like KERS introduced', 'Brawn won the 2009 title double'],
  },
  {
    era: '2010-2019',
    title: 'Red Bull to Mercedes',
    summary:
      'Sebastian Vettel’s Red Bull run gave way to the hybrid era, where Mercedes and Lewis Hamilton set a new benchmark for efficiency and execution.',
    highlights: ['Vettel won 4 straight titles', 'Hybrid power units started in 2014', 'Mercedes dominated the late decade'],
  },
  {
    era: '2020-Present',
    title: 'Cost Caps, New Aero, and the Verstappen Era',
    summary:
      'The current period has been shaped by budget caps, ground-effect regulations, sprint formats, and Red Bull’s high-efficiency race execution led by Max Verstappen.',
    highlights: ['2021 title battle reset global interest', '2022 aero rules aimed to improve racing', 'Data-driven strategy is more visible than ever'],
  },
];

export const legendaryChampions = [
  { name: 'Juan Manuel Fangio', titles: 5, note: 'Set the early standard for adaptability and race intelligence.' },
  { name: 'Michael Schumacher', titles: 7, note: 'Defined Ferrari’s golden era through speed, consistency, and team integration.' },
  { name: 'Lewis Hamilton', titles: 7, note: 'One of the most complete drivers in wet, qualifying, race craft, and tyre management.' },
  { name: 'Ayrton Senna', titles: 3, note: 'Benchmark qualifying pace and intense race commitment.' },
  { name: 'Alain Prost', titles: 4, note: 'Known as “The Professor” for strategic precision and race management.' },
];

export const strategyPrinciples = [
  'Undercut: pitting earlier to gain time on fresh tyres while rivals stay out.',
  'Overcut: extending a stint to use clean air or stronger tyre longevity for a faster average.',
  'Track position bias: on circuits where overtaking is hard, teams protect position even at tyre cost.',
  'Safety car leverage: teams model stop windows around likely neutralizations and react instantly.',
  'Tyre phase management: pace targets change through warm-up, peak grip, and degradation phases.',
  'Fuel and ERS deployment: race pace depends on battery harvesting, deployment timing, and lift-and-coast when required.',
];

export const fallbackArticles = [
  {
    title: 'Why strategy now decides more races than outright pace',
    source: 'F1 Pulse Editorial',
    publishedAt: '2026-04-06',
    description:
      'Modern F1 strategy balances tyre wear, dirty air, safety car probability, and pit lane loss more aggressively than any previous era.',
    link: 'https://www.formula1.com/',
  },
  {
    title: 'From Fangio to Verstappen: how championship-winning skillsets changed',
    source: 'F1 Pulse Editorial',
    publishedAt: '2026-04-06',
    description:
      'The championship has moved from mechanical sympathy and improvisation toward simulator preparation, data literacy, and operational precision.',
    link: 'https://www.formula1.com/en/latest/all.html',
  },
  {
    title: 'Circuit design, tyres, and dirty air: the hidden variables behind Sunday results',
    source: 'F1 Pulse Editorial',
    publishedAt: '2026-04-06',
    description:
      'Results often hinge on thermal degradation, race control decisions, and how well teams align their pit strategy with track evolution.',
    link: 'https://www.fia.com/',
  },
];

export const tyreCompounds = [
  {
    name: 'C1',
    label: 'Hardest base compound',
    color: 'Amber',
    use: 'Used on the roughest tracks or in very hot conditions where durability matters most.',
    traits: ['Slowest warm-up', 'Highest durability', 'Lowest peak grip'],
  },
  {
    name: 'C2',
    label: 'Very hard',
    color: 'Amber',
    use: 'Chosen when teams need long opening stints and low degradation risk.',
    traits: ['Stable over long runs', 'Good safety-car flexibility', 'Lower launch grip'],
  },
  {
    name: 'C3',
    label: 'Balanced midpoint',
    color: 'White/Yellow/Red depending on weekend nomination',
    use: 'Often the most versatile compound in the Pirelli range and common on balanced circuits.',
    traits: ['Strong strategic flexibility', 'Predictable degradation', 'Useful race compound'],
  },
  {
    name: 'C4',
    label: 'Soft-leaning',
    color: 'Yellow or Red depending on weekend nomination',
    use: 'Favours tracks with lower energy demand or sessions where fast warm-up matters.',
    traits: ['Quicker warm-up', 'Better one-lap pace', 'Higher degradation'],
  },
  {
    name: 'C5',
    label: 'Softest regular base compound',
    color: 'Red',
    use: 'Selected for street circuits and lower-abrasion tracks where outright grip is prioritized.',
    traits: ['Highest grip', 'Fast warm-up', 'Shortest life'],
  },
  {
    name: 'Intermediate',
    label: 'Green wet-weather tyre',
    color: 'Green',
    use: 'For damp or drying conditions when there is standing water but not enough for full wets.',
    traits: ['Crossover tyre', 'Handles mixed conditions', 'Overheats on a dry line'],
  },
  {
    name: 'Full Wet',
    label: 'Blue heavy-rain tyre',
    color: 'Blue',
    use: 'For heavy spray and standing water when maximum water displacement is required.',
    traits: ['Maximum water evacuation', 'Slow on drying track', 'Used in worst rain conditions'],
  },
];

export const controlConcepts = [
  {
    title: 'DRS',
    summary: 'The Drag Reduction System opens the rear wing flap in designated zones to reduce drag and increase top speed when a driver is within the detection threshold.',
  },
  {
    title: 'ERS Deployment',
    summary: 'The Energy Recovery System stores harvested electrical energy and releases it strategically for overtaking, defending, and lap-time management.',
  },
  {
    title: 'Brake Bias',
    summary: 'Drivers adjust front-to-rear braking distribution to balance stability, rotation, tyre temperatures, and lock-up risk.',
  },
  {
    title: 'Differential',
    summary: 'Diff settings affect traction on corner exit, entry stability, and how sharply the car rotates through slower corners.',
  },
  {
    title: 'Engine Modes',
    summary: 'Teams manage power delivery and reliability through mapped engine settings tuned for attack, defense, fuel saving, or cooling.',
  },
  {
    title: 'Lift and Coast',
    summary: 'Drivers lift off the throttle before the braking point to save fuel, cool brakes, and reduce thermal stress while minimizing lap-time loss.',
  },
];

export const raceControlSignals = [
  'Yellow flag: hazard ahead, overtaking prohibited in the affected sector.',
  'Double yellow: major hazard, drivers must slow significantly and be prepared to stop.',
  'Green flag: track is clear and normal racing resumes.',
  'Blue flag: a slower car must allow a faster lapping car through.',
  'Black and white flag: warning for unsporting or repeated rule breaches.',
  'Black flag: immediate disqualification and return to the pits.',
  'Safety car: field neutralized and compressed behind the safety car.',
  'Virtual safety car: reduced speed delta across the full lap without bunching the field.',
  'Red flag: session stopped due to unsafe conditions or major incident.',
];
