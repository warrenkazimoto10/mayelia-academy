import { useEffect, useState } from "react";
import { api } from "../api";
import type { Participant } from "../types";

export default function ParticipantsPage() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newCivility, setNewCivility] = useState("M.");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editCivility, setEditCivility] = useState("M.");

  async function load(q?: string) {
    try {
      setParticipants(await api.participants.list(q));
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => load(search || undefined), 250);
    return () => clearTimeout(t);
  }, [search]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      await api.participants.create({ civility: newCivility, fullName: newName.trim() });
      setNewName("");
      await load(search || undefined);
    } catch (err: any) {
      setError(err.message);
    }
  }

  function startEdit(p: Participant) {
    setEditingId(p.id);
    setEditName(p.fullName);
    setEditCivility(p.civility);
  }

  async function saveEdit() {
    if (editingId == null) return;
    try {
      await api.participants.update(editingId, { fullName: editName, civility: editCivility });
      setEditingId(null);
      await load(search || undefined);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(p: Participant) {
    if (!confirm(`Supprimer ${p.fullName} ? Tous ses certificats associés seront aussi supprimés.`)) return;
    try {
      await api.participants.remove(p.id);
      await load(search || undefined);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Participants</h1>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <form className="card actions-row" onSubmit={handleCreate}>
        <select value={newCivility} onChange={(e) => setNewCivility(e.target.value)} style={{ width: 90 }}>
          <option value="M.">M.</option>
          <option value="Mme.">Mme.</option>
        </select>
        <input
          placeholder="Nom complet"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ flex: 1, minWidth: 240 }}
        />
        <button className="primary" type="submit">+ Ajouter un participant</button>
      </form>

      <input
        placeholder="Rechercher par nom..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: 14 }}
      />

      <table>
        <thead>
          <tr>
            <th>Civilité</th>
            <th>Nom</th>
            <th>Certificats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p) => (
            <tr key={p.id}>
              {editingId === p.id ? (
                <>
                  <td>
                    <select value={editCivility} onChange={(e) => setEditCivility(e.target.value)}>
                      <option value="M.">M.</option>
                      <option value="Mme.">Mme.</option>
                    </select>
                  </td>
                  <td><input value={editName} onChange={(e) => setEditName(e.target.value)} /></td>
                  <td>{p._count?.certificates ?? 0}</td>
                  <td className="actions-row">
                    <button className="primary" onClick={saveEdit}>Enregistrer</button>
                    <button onClick={() => setEditingId(null)}>Annuler</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{p.civility}</td>
                  <td>{p.fullName}</td>
                  <td><span className="badge">{p._count?.certificates ?? 0}</span></td>
                  <td className="actions-row">
                    <button onClick={() => startEdit(p)}>Modifier</button>
                    <button className="danger" onClick={() => handleDelete(p)}>Supprimer</button>
                  </td>
                </>
              )}
            </tr>
          ))}
          {participants.length === 0 && (
            <tr><td colSpan={4} className="muted">Aucun participant trouvé.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
