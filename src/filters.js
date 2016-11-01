
export const shape = ({ e }) => e.type === 'shape';
export const line = ({ e }) => e.shape === 'line';
export const area = ({ e }) => e.shape === 'area';

export const selection = ({ e }) => e.type === 'selection';

export const axis = ({ e }) => e.type === 'axis';

export const scale = ({ e }) => e.type === 'scale';

export const transition = ({ e }) => e.type === 'transition';
