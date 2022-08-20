import {FC} from 'react';

export const ShowIf: FC<{condition?: boolean}> = ({
  condition = false,
  children,
}) => {
  if (condition) {
    return <>{children}</>;
  }
  return null;
};
