import { useState, useEffect } from 'react';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  age: ''
};

const StudentForm = ({ onSave, editingStudent, onCancel }) => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
    } else {
      setFormData(initialState);
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? parseInt(value) || '' : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData(initialState);
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h3>{editingStudent ? 'Editar Estudiante' : 'Nuevo Estudiante'}</h3>
      <div className="form-row">
        <input type="text" name="firstName" placeholder="Nombre"
          value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Apellido"
          value={formData.lastName} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <input type="email" name="email" placeholder="correo@ejemplo.com"
          value={formData.email} onChange={handleChange} required />
        <input type="number" name="age" placeholder="Edad"
          value={formData.age} onChange={handleChange} min="1" max="120" required />
      </div>
      <div className="form-buttons">
        <button type="submit" className="btn-primary">
          {editingStudent ? 'Actualizar' : 'Crear'}
        </button>
        {editingStudent && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default StudentForm;