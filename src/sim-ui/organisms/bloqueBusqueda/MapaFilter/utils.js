import { COLOR_LEGEND } from "./constants";

const roundTenth = (N) => Math.ceil(N / 10) * 10;

export function getScaleDomain(maxValue) {
  if (!maxValue) return [];

  const max =
    maxValue > COLOR_LEGEND.domain.max ? COLOR_LEGEND.domain.max : maxValue;
  const sectionsNumber = Math.ceil(roundTenth(max) / 10);
  const scaleLenght =
    sectionsNumber >= COLOR_LEGEND.colorsRange.length
      ? COLOR_LEGEND.colorsRange.length
      : sectionsNumber > 1
      ? sectionsNumber
      : sectionsNumber + 1;

  const scale = [];
  for (let i = 0; i < scaleLenght; i++) {
    scale.push(roundTenth((max / (scaleLenght - 1)) * i));
  }
  return scale;
}

export function getColor(scaleDomain, value) {
  for (let i = scaleDomain.length - 1; i >= 0; i--) {
    if (value > scaleDomain[i]) {
      return COLOR_LEGEND.colorsRange[i];
    }
  }
}
