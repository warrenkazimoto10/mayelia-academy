import { useState, useEffect } from 'react';
import { conseilsAPI, Conseil } from '@/lib/api';

export const useConseils = () => {
  const [conseils, setConseils] = useState<Conseil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConseils = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await conseilsAPI.getAll();
        setConseils(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des conseils');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConseils();
  }, []);

  return { conseils, loading, error, refetch: () => {
    const fetchConseils = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await conseilsAPI.getAll();
        setConseils(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des conseils');
      } finally {
        setLoading(false);
      }
    };
    fetchConseils();
  }};
};

export const useConseil = (id: string | number) => {
  const [conseil, setConseil] = useState<Conseil | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConseil = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await conseilsAPI.getById(id);
        setConseil(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du conseil');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchConseil();
    }
  }, [id]);

  return { conseil, loading, error };
};
