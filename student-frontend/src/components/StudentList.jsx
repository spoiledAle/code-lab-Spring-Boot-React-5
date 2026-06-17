import { useState, useEffect } from 'react';
import { studentService } from '../services/studentService';
import StudentForm from './StudentForm';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await studentService.getAll();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar estudiantes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este estudiante?')) return;
    try {
      await studentService.delete(id);
      setStudents(students.filter(s => s.id !== id));
    } catch (err) {
      alert('Error al eliminar: ' + err.message);
    }
  };

  const handleSave = async (student) => {
    try {
      if (editingStudent) {
        const updated = await studentService.update(editingStudent.id, student);
        setStudents(students.map(s => s.id === updated.id ? updated : s));
      } else {
        const created = await studentService.create(student);
        setStudents([...students, created]);
      }
      setEditingStudent(null);
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    }
  };

  if (loading) return <p className="loading">Cargando estudiantes...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="student-list">
      <h2>Lista de Estudiantes</h2>
      <StudentForm
        onSave={handleSave}
        editingStudent={editingStudent}
        onCancel={() => setEditingStudent(null)}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Edad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <button onClick={() => setEditingStudent(student)}>Editar</button>
                <button onClick={() => handleDelete(student.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;