import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import type { Certificate } from "../types";

function formatFrenchDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function VerifyPage() {
  const { ref } = useParams();
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!ref) return;
    api.certificates
      .verify(ref)
      .then(setCertificate)
      .catch(() => setNotFound(true));
  }, [ref]);

  if (notFound) {
    return (
      <div className="card verify-card">
        <div className="verify-icon" style={{ color: "var(--danger)" }}>✕</div>
        <h2>Certificat introuvable</h2>
        <p className="muted">La référence <code>{ref}</code> ne correspond à aucun certificat émis par Mayelia Academy.</p>
      </div>
    );
  }

  if (!certificate) return <p className="muted">Vérification en cours...</p>;

  return (
    <div className="card verify-card">
      <div className="verify-icon" style={{ color: "var(--success)" }}>✓</div>
      <h2>Certificat valide</h2>
      <p style={{ fontSize: "1.1rem", fontWeight: 600 }}>
        {certificate.participant.civility} {certificate.participant.fullName}
      </p>
      <p>
        a suivi avec succès la formation <strong>{certificate.training.title}</strong>
      </p>
      <p className="muted">
        Du {formatFrenchDate(certificate.training.startDate)} au {formatFrenchDate(certificate.training.endDate)}
      </p>
      <p className="muted">
        Délivré à {certificate.training.issuePlace}, le {formatFrenchDate(certificate.training.issueDate)}
      </p>
      <p><span className="badge">REF : {certificate.ref}</span></p>
    </div>
  );
}
