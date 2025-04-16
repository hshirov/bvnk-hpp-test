import { AcceptQuoteCard } from '@/components/AcceptQuoteCard';

const Home = () => {
  return (
    <AcceptQuoteCard
      title="Merchant Display Name"
      priceAmount={200}
      currency="EUR"
      referenceNumber="REF292970"
    />
  );
};

export default Home;
