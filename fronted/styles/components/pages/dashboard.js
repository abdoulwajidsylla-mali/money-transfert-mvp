import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ButtonWave from '../components/ButtonWave';
import Table from '../components/Table';
import api from '../utils/api';

export default function Dashboard() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const walletRes = await api.get('/wallet');
        setWallet(walletRes.data);
        const transRes = await api.get('/transactions');
        setTransactions(transRes.data.slice(0, 5)); // Résumé des 5 dernières
      } catch (error) {
        if (error.response?.status === 401) router.push('/login');
      }
    };
    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <ButtonWave onClick={handleLogout}>Déconnexion</ButtonWave>
        </div>
        {wallet && (
          <div className="bg-white p-6 rounded shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Solde : {wallet.solde} €</h2>
            <Link href="/sendMoney">
              <ButtonWave>Envoyer de l'argent</ButtonWave>
            </Link>
          </div>
        )}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Historique récent</h2>
          <Table
            headers={['Date', 'Montant', 'Statut']}
            data={transactions}
            renderRow={(transaction) => (
              <tr key={transaction._id}>
                <td className="py-2 px-4 border-b">{new Date(transaction.date_creation).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{transaction.montant} €</td>
                <td className="py-2 px-4 border-b">{transaction.statut}</td>
              </tr>
            )}
          />
          <Link href="/history" className="text-blue-500 mt-4 inline-block">Voir tout l'historique</Link>
        </div>
      </div>
    </div>
  );
}