import React, { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, editingStudent, onEditingChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: ''
  });

  const [errors, setErrors] = useState({});

  // Load data if editing
  useEffect(() => {
    if (editingStudent) {
      setFormData({
        name: editingStudent.name || '',
        email: editingStudent.email || '',
        course: editingStudent.course || ''
      });
    }
  }, [editingStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    onSubmit(formData);

    // Reset form
    setFormData({
      name: '',
      email: '',
      course: ''
    });
    setErrors({});
    onEditingChange(null);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      course: ''
    });
    setErrors({});
    onEditingChange(null);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2 style={{ marginBottom: '25px', color: '#646cff' }}>
        {editingStudent ? 'Edit Student' : 'Add New Student'}
      </h2>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
            className={`form-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="course">Course *</label>
        <input
          type="text"
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="Enter course name (e.g., CS101, MATH202)"
          className={`form-input ${errors.course ? 'error' : ''}`}
        />
        {errors.course && <div className="error-message">{errors.course}</div>}
      </div>

      <div className="btn-group">
        <button type="submit" className="btn-submit">
          {editingStudent ? 'Update Student' : 'Add Student'}
        </button>
        <button type="button" className="btn-reset" onClick={handleReset}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
