import { PageHeaderContainer } from '@/components';

export default function MenuLayout({ children }: { children: any }) {
  return (
    <PageHeaderContainer title={`Список добавленных меню`}>
      {children}     
    </PageHeaderContainer>
  );
}
