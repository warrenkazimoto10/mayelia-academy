import { useState, useEffect } from 'react';
import { actualitesAPI, Actualite } from '@/lib/api';

export const useActualites = () => {
  const [actualites, setActualites] = useState<Actualite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActualites = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await actualitesAPI.getAll();
        setActualites(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des actualités');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActualites();
  }, []);

  return { actualites, loading, error, refetch: () => {
    const fetchActualites = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await actualitesAPI.getAll();
        setActualites(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement des actualités');
      } finally {
        setLoading(false);
      }
    };
    fetchActualites();
  }};
};

export const useActualite = (id: string | number) => {
  const [actualite, setActualite] = useState<Actualite | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActualite = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await actualitesAPI.getById(id);
        setActualite(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement de l\'actualité');
        console.error('Erreur:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchActualite();
    }
  }, [id]);

  return { actualite, loading, error };
};
