import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Table from '../components/Table';
import api from '../utils/api';

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data);
      } catch (error) {
        if (error.response?.status === 401) router.push('/login');
      }
    };
    fetchTransactions();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Historique des transactions</h1>
        <Table
          headers={['Date', 'Montant', 'Frais', 'Expéditeur', 'Destinataire', 'Statut']}
          data={transactions}
          renderRow={(transaction) => (
            <tr key={transaction._id}>
              <td className="py-2 px-4 border-b">{new Date(transaction.date_creation).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{transaction.montant} €</td>
              <td className="py-2 px-4 border-b">{transaction.frais} €</td>
              <td className="py-2 px-4 border-b">{transaction.sender_id?.nom || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{transaction.receiver_id?.nom || 'N/A'}</td>
              <td className="py-2 px-4 border-b">{transaction.statut}</td>
            </tr>
          )}
        />
      </div>
    </div>
  );
}