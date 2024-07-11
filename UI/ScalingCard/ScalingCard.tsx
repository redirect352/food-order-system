import { Card, CardProps } from '@mantine/core';
import React, { FunctionComponent } from 'react';
import classes from './styles.module.scss';

interface ScalingCardProps extends CardProps {

}

const ScalingCard: FunctionComponent<ScalingCardProps> = (props) => (
    <Card {...props} className={[classes.hoverCardWrapper, props.className].join(' ')}>
    </Card>
  );

export default ScalingCard;
