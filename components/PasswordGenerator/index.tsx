import { useState } from 'react';
import classes from './styles.module.scss';
import generator from 'generate-password';
import { ActionIcon, Button, Flex, Text, Tooltip } from '@mantine/core';
import { IconCopy, IconCopyCheck, IconRefresh } from '@tabler/icons-react';
import { useClipboard } from '@mantine/hooks';
interface PasswordGeneratorProps {
  
}

const PasswordGenerator = (props: PasswordGeneratorProps) => {
  const generate = () => generator.generate({ length:8+Math.floor(Math.random()*8),'numbers':true, 'symbols':true })
  const [examplePass, setExamplePass] = useState('');
  const updatePass = () => setExamplePass(generate());
  const {copy, copied} = useClipboard();
  const onCopyClick = ()=>{
    copy(examplePass);
    if(copied) return;
    // setCopied(true);
    // setTimeout(()=>setCopied(false),5000);
  }
  return (
    <div className={classes.generatorBox}>
      {examplePass.length === 0 ? 
        <Button variant='subtle' fullWidth onClick={updatePass}>Generate password</Button>
        :
      <>
        <Flex gap={'sm'} align={'center'}>
          <ActionIcon size={'lg'} variant='transparent' onClick={updatePass}>
            <IconRefresh />
          </ActionIcon>
          <Text className={classes.passwordText}>
            {examplePass}
          </Text>
        </Flex>
        <Tooltip label={copied?'Пароль скопирован в буфер обмена':'Скопировать'}>
          <ActionIcon size={'lg'} variant='transparent' onClick={onCopyClick}>
            {!copied && <IconCopy /> }
            {copied && <IconCopyCheck /> }
          </ActionIcon>
        </Tooltip>
      </>
      }

    </div>
  );
};

export default PasswordGenerator;