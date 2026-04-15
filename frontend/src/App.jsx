import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './StudentForm';
import StudentTable from './StudentTable';

const API_BASE_URL = 'http://localhost:8080/api/students';

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch all students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    setLoading(true);
    setError('');

    axios.get(API_BASE_URL)
      .then(response => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load students. Is the backend running on port 8080?');
        setLoading(false);
        console.error('Error fetching students:', err);
      });
  };

  const handleAddOrUpdateStudent = (formData) => {
    if (editingStudent) {
      // Update existing student
      axios.put(`${API_BASE_URL}/${editingStudent.id}`, formData)
        .then(response => {
          setStudents(students.map(s => s.id === editingStudent.id ? response.data : s));
          setMessage('Student updated successfully!');
          setEditingStudent(null);
          clearMessageAfterDelay();
        })
        .catch(err => {
          setError('Failed to update student. Please try again.');
          console.error('Error updating student:', err);
        });
    } else {
      // Add new student
      axios.post(API_BASE_URL, formData)
        .then(response => {
          setStudents([...students, response.data]);
          setMessage('Student added successfully!');
          clearMessageAfterDelay();
        })
        .catch(err => {
          setError('Failed to add student. Please check your input and try again.');
          console.error('Error adding student:', err);
        });
    }
  };

  const handleDeleteStudent = (id) => {
    axios.delete(`${API_BASE_URL}/${id}`)
      .then(() => {
        setStudents(students.filter(s => s.id !== id));
        setMessage('Student deleted successfully!');
        clearMessageAfterDelay();
      })
      .catch(err => {
        setError('Failed to delete student. Please try again.');
        console.error('Error deleting student:', err);
      });
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const handleErrorClose = () => {
    setError('');
  };

  return (
    <div className="container-main">
      <div className="header">
        <h1>📚 Student Record Manager</h1>
        <p>Manage student information efficiently</p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>❌</span>
          <div>
            <strong>Error:</strong> {error}
            <button
              onClick={handleErrorClose}
              style={{
                marginLeft: '10px',
                background: 'none',
                border: 'none',
                color: '#ff6b6b',
                cursor: 'pointer',
                fontSize: '1.2em',
                padding: '0'
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {message && (
        <div className="alert alert-success">
          <span>✅</span>
          <div><strong>Success:</strong> {message}</div>
        </div>
      )}

      <StudentForm
        onSubmit={handleAddOrUpdateStudent}
        editingStudent={editingStudent}
        onEditingChange={setEditingStudent}
      />

      <StudentTable
        students={students}
        onDelete={handleDeleteStudent}
        onEdit={handleEditStudent}
        loading={loading}
      />
    </div>
  );
};

export default App;
