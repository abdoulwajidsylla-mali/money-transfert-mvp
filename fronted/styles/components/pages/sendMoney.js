import { useState } from 'react';
import { useRouter } from 'next/router';
import Form from '../components/Form';
import ButtonWave from '../components/ButtonWave';
import Notification from '../components/Notification';
import api from '../utils/api';

export default function SendMoney() {
  const [formData, setFormData] = useState({ receiver_telephone: '', montant: '', reference: '' });
  const [notification, setNotification] = useState(null);
  const [confirming, setConfirming] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirming) {
      setConfirming(true);
      return;
    }
    try {
      await api.post('/send-money', formData);
      setNotification({ message: 'Envoi réussi !', type: 'success' });
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error) {
      setNotification({ message: error.response?.data?.message || 'Erreur', type: 'error' });
    }
    setConfirming(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Envoyer de l'argent</h1>
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        <Form onSubmit={handleSubmit}>
          <input
            type="tel"
            name="receiver_telephone"
            placeholder="Téléphone destinataire"
            value={formData.receiver_telephone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="montant"
            placeholder="Montant"
            value={formData.montant}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min="0.01"
            step="0.01"
            required
          />
          <input
            type="text"
            name="reference"
            placeholder="Référence unique"
            value={formData.reference}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <ButtonWave type="submit" disabled={confirming}>
            {confirming ? 'Confirmer l\'envoi' : 'Envoyer'}
          </ButtonWave>
        </Form>
      </div>
    </div>
  );
}