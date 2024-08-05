import { PageHeaderContainer } from '@/components';

export default function ActiveOrdersLayout({ children }: { children: any }) {
  return (
    <PageHeaderContainer title="Активные заказы">
      { children }
    </PageHeaderContainer>
  );
}
