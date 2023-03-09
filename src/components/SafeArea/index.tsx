import React from 'react';

type Props = {
  children: React.ReactNode;
};

const SafeArea = ({children}: Props) => {
  return <>{children}</>;
};

export default SafeArea;
