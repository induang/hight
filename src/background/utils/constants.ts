export const DEFAULT_COLOR_TITLE = 'yellow';

export const DEFAULT_COLORS = [
  {
    title: 'yellow',
    color: 'rgb(255, 246, 21)',
  },
  {
    title: 'green',
    color: 'rgb(68, 255, 147)',
  },
  {
    title: 'blue',
    color: 'rgb(66, 229, 255)',
  },
  {
    title: 'pink',
    color: 'rgb(244, 151, 255)',
  },
  {
    title: 'dark',
    color: 'rgb(52, 73, 94)',
    textColor: 'rgb(255, 255, 255)',
  },
];
export interface ColorThemeModel {
  name: string;
  colors: Array<{ title: string; color: string; colorHEX?: string }>;
}
export const DEFAULT_COLOR_THEMES: Array<ColorThemeModel> = [
  {
    name: 'CUPCAKES',
    colors: [
      { title: 'red', color: '#fe4362', colorHEX: 'rgb(254,67,98)' },
      { title: 'pink', color: '#fc9d9b', colorHEX: 'rgb(252,157,155)' },
      { title: 'yellow', color: '#ffccad', colorHEX: 'rgb(255,204,173)' },
      { title: 'green', color: '#c9c8aa', colorHEX: 'rgb(201,200,170)' },
    ],
  },
  {
    name: 'FLUORESCENT RAINBOW',
    colors: [
      { title: 'Fluorescent Blue', color: 'rgb(19, 244, 239)' },
      { title: 'Bright Green', color: 'rgb(104, 255, 0)' },
      { title: 'Lemon Glacier', color: 'rgb(250, 255, 0)' },
      { title: 'Fluorescent Orange', color: 'rgb(255, 191, 0)' },
    ],
  },
  {
    name: 'CONTRASTING PASTELS',
    colors: [
      { title: 'Mimi Pink', color: 'rgb(255, 219, 234)' },
      { title: 'Pale Lavender', color: 'rgb(221, 216, 255)' },
      { title: 'Water', color: 'rgb(214, 238, 252)' },
      { title: 'Cosmic Latte', color: 'rgb(253, 248, 230)' },
    ],
  },
];
