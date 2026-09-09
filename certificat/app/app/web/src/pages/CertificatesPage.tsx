import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import type { Certificate } from "../types";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.certificates
      .list()
      .then(setCertificates)
      .catch((err) => setError(err.message));
  }, []);

  const filtered = certificates.filter((c) => {
    const haystack = `${c.ref} ${c.participant.fullName} ${c.training.title}`.toLowerCase();
    return haystack.includes(search.toLowerCase());
  });

  return (
    <div>
      <div className="page-header">
        <h1>Certificats générés</h1>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <input
        placeholder="Rechercher par REF, nom ou formation..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", marginBottom: 14 }}
      />

      <table>
        <thead>
          <tr>
            <th>REF</th>
            <th>Participant</th>
            <th>Formation</th>
            <th>Date d'émission</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.id}>
              <td><code>{c.ref}</code></td>
              <td>{c.participant.civility} {c.participant.fullName}</td>
              <td><Link to={`/trainings/${c.trainingId}`}>{c.training.title}</Link></td>
              <td>{c.training.issueDate.slice(0, 10)}</td>
              <td className="actions-row">
                <a className="btn" href={api.certificates.pdfUrl(c.id)} target="_blank" rel="noreferrer">Voir PDF</a>
                <Link className="btn" to={`/verify/${c.ref}`} target="_blank">Page de vérification</Link>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan={5} className="muted">Aucun certificat trouvé.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
