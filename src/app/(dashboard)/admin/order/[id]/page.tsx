import DetailOrder from "./_components/detail-order";

export const metadata = {
  title: "NZ Putra | Detail Order",
};

export default function DetailOrderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  return <DetailOrder id={id} />;
}
