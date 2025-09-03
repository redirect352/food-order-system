import { Card, CardProps, PolymorphicComponentProps } from '@mantine/core';
import React, { FunctionComponent } from 'react';
import classes from './styles.module.scss';

interface ScalingCardProps extends PolymorphicComponentProps<'div', CardProps> {
  animationType?: 'scale' | 'up',
}

const ScalingCard: FunctionComponent<ScalingCardProps> = ({animationType='scale' ,...props}) => (
    <Card 
      {...props} 
      className={[classes.hoverCardWrapper, props.className].join(' ')} 
      data-animation={animationType}
    >
    </Card>
);

export default ScalingCard;
