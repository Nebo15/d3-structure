
import line from './line';
import area from './area';

export default (d3Subj) =>
  [area, line].reduce((s, l) => l(s), d3Subj);
