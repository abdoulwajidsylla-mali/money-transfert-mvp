import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Form from '../components/Form';
import ButtonWave from '../components/ButtonWave';
import Notification from '../components/Notification';
import api from '../utils/api';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', mot_de_passe: '' });
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', formData);
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } catch (error) {
      setNotification({ message: error.response?.data?.message || 'Erreur', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Connexion</h1>
        {notification && <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />}
        <Form onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email ou Téléphone"
            value={formData.email}
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
          <ButtonWave type="submit">Se connecter</ButtonWave>
        </Form>
        <p className="mt-4 text-center">
          Pas de compte ? <Link href="/register" className="text-blue-500">S'inscrire</Link>
        </p>
      </div>
    </div>
  );
}