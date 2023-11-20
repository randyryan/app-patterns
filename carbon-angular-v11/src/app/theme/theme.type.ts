type Theme = 'cds--theme--white' | 'cds--theme--g10' | 'cds--theme--g90' | 'cds--theme--g100';

type Themes = { theme: Theme, name: string, active: boolean }[];

const THEMES: Themes = [
  { theme: 'cds--theme--white', name: 'White', active: true },
  { theme: 'cds--theme--g10', name: 'G10', active: false },
  { theme: 'cds--theme--g90', name: 'G90', active: false },
  { theme: 'cds--theme--g100', name: 'G100', active: false }
];

export { Theme, Themes, THEMES };
