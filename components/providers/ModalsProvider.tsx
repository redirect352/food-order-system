import { FunctionComponent } from 'react';
import { 
  ContextModalProps, 
  ModalsProvider as MantineModalProvider 
} from '@mantine/modals';

export const ModalsProvider: FunctionComponent<{ children: any }> = ({ 
  children 
}) => {
  return (
    <MantineModalProvider>
      {children}
    </MantineModalProvider>
  );
};

