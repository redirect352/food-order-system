import { PageHeaderContainer } from '@/components';

export default function MenuLayout({ children }: { children: any }) {
  return (
    <PageHeaderContainer title="Меню на 28.06.2024">
      {children}
    </PageHeaderContainer>
  );
}
