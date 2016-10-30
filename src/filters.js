
export const shape = ({ e }) => e.type === 'shape';
export const line = ({ e }) => e.shape === 'line';
export const area = ({ e }) => e.shape === 'area';

export const selection = ({ e }) => e.type === 'selection';
