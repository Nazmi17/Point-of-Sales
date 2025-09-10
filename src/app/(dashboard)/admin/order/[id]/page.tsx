import DetailOrder from "./_components/detail-order";

export const metadata = {
  title: "NZ Putra | Detail Order",
};

type DetailOrderPageProps = {
  params: {
    id: string;
  };
};

export default function DetailOrderPage({ params }: DetailOrderPageProps) {
  return <DetailOrder id={params.id} />;
}
