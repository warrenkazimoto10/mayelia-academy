import { NavLink, Route, Routes } from "react-router-dom";
import TrainingsPage from "./pages/TrainingsPage";
import TrainingDetailPage from "./pages/TrainingDetailPage";
import ParticipantsPage from "./pages/ParticipantsPage";
import CertificatesPage from "./pages/CertificatesPage";
import VerifyPage from "./pages/VerifyPage";

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">Mayelia Academy &mdash; Certificats</div>
        <nav>
          <NavLink to="/" end>Formations</NavLink>
          <NavLink to="/participants">Participants</NavLink>
          <NavLink to="/certificates">Certificats</NavLink>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<TrainingsPage />} />
          <Route path="/trainings/:id" element={<TrainingDetailPage />} />
          <Route path="/participants" element={<ParticipantsPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/verify/:ref" element={<VerifyPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
