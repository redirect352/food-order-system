'use client';

import { FunctionComponent, Key } from 'react';
import './styles.scss';
import * as motion from "framer-motion/client"
import { AnimatePresence } from 'framer-motion';

interface TransitionListProps {
  items: {
    item: React.ReactNode,
    key: Key
  }[],
}

const TransitionList: FunctionComponent<TransitionListProps> = ({ items }) => (
  <AnimatePresence>
    {
      items.map(({ item, key }) => (
          <motion.div 
            key={key}            
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -150 }}
          >
            {item}
          </motion.div>
        ))
    }
  </AnimatePresence>
  );
export default TransitionList;
