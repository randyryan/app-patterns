type Theme = 'carbon--theme--white' | 'carbon--theme--g10' | 'carbon--theme--g90' | 'carbon--theme--g100';

type Themes = { theme: Theme, name: string, active: boolean }[];

const THEMES: Themes = [
  { theme: 'carbon--theme--white', name: 'White', active: true },
  { theme: 'carbon--theme--g10', name: 'G10', active: false },
  { theme: 'carbon--theme--g90', name: 'G90', active: false },
  { theme: 'carbon--theme--g100', name: 'G100', active: false }
];

export { Theme, Themes, THEMES };
