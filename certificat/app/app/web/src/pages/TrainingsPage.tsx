import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import type { Training } from "../types";

function toInputDate(d: string) {
  return d.slice(0, 10);
}

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    client: "",
    startDate: "",
    endDate: "",
    issuePlace: "Abidjan",
    issueDate: "",
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try {
      setTrainings(await api.trainings.list());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const created = await api.trainings.create({
        title: form.title,
        client: form.client || undefined,
        startDate: form.startDate,
        endDate: form.endDate || form.startDate,
        issuePlace: form.issuePlace,
        issueDate: form.issueDate || form.endDate || form.startDate,
      });
      setShowForm(false);
      setForm({ title: "", client: "", startDate: "", endDate: "", issuePlace: "Abidjan", issueDate: "" });
      navigate(`/trainings/${created.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Formations</h1>
        <button className="primary" onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Annuler" : "+ Nouvelle formation"}
        </button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {showForm && (
        <form className="card" onSubmit={handleCreate}>
          <div className="form-grid">
            <label>
              Intitulé de la formation
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="ex: LEAD INVESTIGATOR"
              />
            </label>
            <label>
              Client (optionnel)
              <input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} placeholder="ex: K1 Mining SA" />
            </label>
            <label>
              Début
              <input required type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            </label>
            <label>
              Fin
              <input required type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            </label>
            <label>
              Lieu d'émission
              <input value={form.issuePlace} onChange={(e) => setForm({ ...form, issuePlace: e.target.value })} />
            </label>
            <label>
              Date d'émission du certificat
              <input type="date" value={form.issueDate} onChange={(e) => setForm({ ...form, issueDate: e.target.value })} />
            </label>
          </div>
          <button className="primary" type="submit" disabled={saving}>
            {saving ? "Création..." : "Créer la formation"}
          </button>
        </form>
      )}

      {loading ? (
        <p className="muted">Chargement...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Formation</th>
              <th>Client</th>
              <th>Période</th>
              <th>Date d'émission</th>
              <th>Certificats</th>
            </tr>
          </thead>
          <tbody>
            {trainings.map((t) => (
              <tr key={t.id} className="clickable" onClick={() => navigate(`/trainings/${t.id}`)}>
                <td>{t.title}</td>
                <td>{t.client || "—"}</td>
                <td>
                  {toInputDate(t.startDate)} {t.startDate !== t.endDate ? `→ ${toInputDate(t.endDate)}` : ""}
                </td>
                <td>{toInputDate(t.issueDate)}</td>
                <td><span className="badge">{t._count?.certificates ?? 0}</span></td>
              </tr>
            ))}
            {trainings.length === 0 && (
              <tr>
                <td colSpan={5} className="muted">Aucune formation pour le moment.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
