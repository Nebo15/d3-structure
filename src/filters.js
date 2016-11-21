
export const shape = (subjType) => subjType === 'shape';

export const line = ({ type }) => type === 'line';
export const area = ({ type }) => type === 'area';

export const selection = (subjType) => subjType === 'selection';

export const axis = (subjType) => subjType === 'axis';

export const scale = (subjType) => subjType === 'scale';

export const transition = ({ e }) => e.type === 'transition';
