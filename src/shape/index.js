
import line from './line';

export default (d3Subj) =>
  [line].reduce((s, l) => l(s), d3Subj);
