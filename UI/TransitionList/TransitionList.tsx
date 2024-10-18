'use client';

import { FunctionComponent, Key } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './styles.scss';

interface TransitionListProps {
  items: {
    item: React.ReactNode,
    key: Key
  }[],
}

const TransitionList: FunctionComponent<TransitionListProps> = ({ items }) => (
    <TransitionGroup>
      {
        items.map(({ item, key }) => (
          <CSSTransition key={key} timeout={250} classNames="my-node">
            {item}
          </CSSTransition>
        ))
      }
    </TransitionGroup>
  );
export default TransitionList;
