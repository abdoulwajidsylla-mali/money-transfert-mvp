import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Form from '../components/Form';
import ButtonWave from '../components/ButtonWave';
import Notification from '../components/Notification';
import api from '../utils/api';

export default function Register() {
  const [formData, setFormData] = useState({ nom: '', email: '', telephone: '', mot_de_passe: '' });
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/register', formData);
      setNotification({ message: 'Inscription réussie !', type: 'success' });
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      setNotification({ message: error.response?.data?.message || 'Erreur', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Inscription</h1>
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            value={formData.nom}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="tel"
            name="telephone"
            placeholder="Téléphone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            name="mot_de_passe"
            placeholder="Mot de passe"
            value={formData.mot_de_passe}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <ButtonWave type="submit">S'inscrire</ButtonWave>
        </Form>
        <p className="mt-4 text-center">
          Déjà un compte ? <Link href="/login" className="text-blue-500">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}