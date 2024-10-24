import { Box, Progress, Group, Text, Center, TextInputProps, TextInput } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

export type PasswordStrengthProps = {
  checkValue?: string,
} & TextInputProps;
function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size="0.9rem" stroke={1.5} /> : <IconX size="0.9rem" stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Включает цифры' },
  { re: /[a-z]/, label: 'Включает строчную букву' },
  { re: /[A-Z]/, label: 'Включает заглавную букву' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Содержит специальный символ' },
];

function getStrength(password: string) {
  let multiplier = password?.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export function PasswordStrength({ checkValue, ...props }: PasswordStrengthProps) {
  const testValue = checkValue ?? props.value?.toString() ?? '';
  const strength = getStrength(testValue);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(testValue)}
    />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: '0ms' } }}
        value={
          testValue.length > 0 && index === 0 ? 100 : strength >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

  return (
    <div>
      <TextInput {...props} />

     {!!testValue &&
     <>
        <Group gap={5} grow mt="xs" mb="md">
          {bars}
        </Group>

        <PasswordRequirement label="Содержит не менее 8 символов" meets={testValue.length > 5} />
        {checks}
     </>}
    </div>
  );
}
