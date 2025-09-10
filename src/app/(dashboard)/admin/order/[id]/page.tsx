import DetailOrder from "./_components/detail-order";

export const metadata = {
  title: "NZ Putra | Detail Order",
};

interface DetailOrderPageProps {
  params: {
    id: string;
  };
}

export default function DetailOrderPage({ params }: DetailOrderPageProps) {
  const { id } = params;
  return <DetailOrder id={id} />;
}
