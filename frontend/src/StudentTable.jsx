import React from 'react';

const StudentTable = ({ students, onDelete, onEdit, loading }) => {
  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  return (
    <div className="table-container">
      <h2 style={{ marginBottom: '20px', color: '#646cff' }}>
        Student List ({students.length})
      </h2>

      {students.length === 0 ? (
        <div className="no-data">
          No students found. Add a new student to get started!
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>#{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => onEdit(student)}
                    title="Edit student"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
                        onDelete(student.id);
                      }
                    }}
                    title="Delete student"
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentTable;
