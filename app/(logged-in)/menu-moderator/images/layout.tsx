import { PageHeaderContainer } from '@/components';

export default function MenuLayout({ children }: { children: any }) {
  return (
    <PageHeaderContainer title={`Список загруженных изображений`}>
      {children}
    </PageHeaderContainer>
  );
}
