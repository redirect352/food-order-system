export function orderStatusColor(statusText: string = ' '): string {
  switch (statusText) {
    case 'создан': return 'cyan.4';
    case 'принят': return 'green.7';
    case 'закрыт': return 'red';
    default:
      return 'gray.2';
  }
}
export const allowedInterfaces = {
  client: ['client'],
  'menu-moderator': ['client', 'menu-moderator'],
  admin: ['client', 'menu-moderator', 'admin'],
};