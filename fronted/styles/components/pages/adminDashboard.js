import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ButtonWave from '../components/ButtonWave';
import Table from '../components/Table';
import Notification from '../components/Notification';
import api from '../utils/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get('/admin/users');
        setUsers(usersRes.data);
        const transRes = await api.get('/admin/transactions');
        setTransactions(transRes.data);
      } catch (error) {
        if (error.response?.status === 401) router.push('/login');
      }
    };
    fetchData();
  }, [router]);

  const handleBlockUser = async (userId) => {
    try {
      await api.post('/admin/block-user', { user_id: userId });
      setNotification({ message: 'Utilisateur bloqué.', type: 'success' });
      setUsers(users.map(user => user._id === userId ? { ...user, blocked: true } : user));
    } catch (error) {
      setNotification({ message: error.response?.data?.message || 'Erreur', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Utilisateurs</h2>
          <Table
            headers={['Nom', 'Email', 'Téléphone', 'Rôle', 'Bloqué', 'Actions']}
            data={users}
            renderRow={(user) => (
              <tr key={user._id}>
                <td className="py-2 px-4 border-b">{user.nom}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b">{user.telephone}</td>
                <td className="py-2 px-4 border-b">{user.role}</td>
                <td className="py-2 px-4 border-b">{user.blocked ? 'Oui' : 'Non'}</td>
                <td className="py-2 px-4 border-b">
                  <ButtonWave onClick={() => handleBlockUser(user._id)} disabled={user.blocked}>Bloquer</ButtonWave>
                </td>
              </tr>
            )}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Transactions</h2>
          <Table
            headers={['Date', 'Montant', 'Expéditeur', 'Destinataire', 'Statut']}
            data={transactions}
            renderRow={(transaction) => (
              <tr key={transaction._id}>
                <td className="py-2 px-4 border-b">{new Date(transaction.date_creation).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{transaction.montant} €</td>
                <td className="py-2 px-4 border-b">{transaction.sender_id?.nom || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{transaction.receiver_id?.nom || 'N/A'}</td>
                <td className="py-2 px-4 border-b">{transaction.statut}</td>
              </tr>
            )}
          />
        </div>
      </div>
    </div>
  );
}