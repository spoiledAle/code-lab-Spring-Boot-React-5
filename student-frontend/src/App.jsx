import StudentList from './components/StudentList';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Sistema de Gestión de Estudiantes</h1>
        <p>React + Spring Boot REST API</p>
      </header>
      <main>
        <StudentList />
      </main>
      <footer className="app-footer">
        <p>Code Lab 4 2026 - React + Spring Boot</p>
      </footer>
    </div>
  );
}

export default App;