import _ from 'lodash';
import React from 'react';

type Props = {
  components: Function[];
  children: React.ReactNode;
};

const ComposeProviders = ({components, children}: Props) => (
  <>
    {_.reduceRight(
      components,
      (previousComponent, CurrentComponent) => (
        <CurrentComponent>{previousComponent}</CurrentComponent>
      ),
      children,
    )}
  </>
);

export default ComposeProviders;
