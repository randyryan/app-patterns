type CardAccent = {
  size?: 'sm' | 'md' | 'lg';
  border?: 'top' | 'left' | 'bottom';
  color?: 'red' | 'magenta' | 'purple' | 'blue' | 'cyan' | 'teal' | 'green' | 'gray' | 'cool-gray' | 'warm-gray';
};

type CardAspectRatio = {
  width?: 1 | 2 | 3 | 4 | 9 | 16;
  height?: 1 | 2 | 3 | 4 | 9 | 16;
  golden?: 'vertical' | 'horizontal';
};

export type { CardAccent, CardAspectRatio };
