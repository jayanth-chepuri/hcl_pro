# Architecture & Design

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                      (http://localhost:3000)                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                    HTTP Request/Response
                     Axios (CORS enabled)
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                     React Frontend (Port 3000)               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    App.jsx (Main)                      │ │
│  │  - State Management (students, loading, errors)       │ │
│  │  - API calls via Axios                                │ │
│  │  - Routes: Add, View, Edit, Delete                    │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  StudentForm.jsx         │    StudentTable.jsx        │ │
│  │  - Form input            │    - Display students      │ │
│  │  - Validation            │    - Action buttons        │ │
│  │  - Submit/Update         │    - Delete confirmation   │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    index.css                           │ │
│  │  - Bootstrap styling                                  │ │
│  │  - Responsive design                                  │ │
│  │  - Dark theme                                         │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────┘
                               │
                    REST API (JSON)
                  http://localhost:8080
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                 Spring Boot Backend (Port 8080)              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │            StudentRecordManagerApplication.java       │ │
│  │  - Main Spring Boot entry point                       │ │
│  │  - Auto-configuration                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              StudentController.java (REST)            │ │
│  │  - GET    /api/students      → Get all               │ │
│  │  - GET    /api/students/{id} → Get by ID            │ │
│  │  - POST   /api/students      → Create                │ │
│  │  - PUT    /api/students/{id} → Update                │ │
│  │  - DELETE /api/students/{id} → Delete                │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │               StudentService.java (Logic)             │ │
│  │  - Business logic                                     │ │
│  │  - Data validation                                    │ │
│  │  - Error handling                                     │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │            StudentRepository.java (JPA)               │ │
│  │  - Extends JpaRepository                              │ │
│  │  - CRUD operations                                    │ │
│  │  - Queries                                            │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │               Student.java (Entity)                   │ │
│  │  - JPA Entity                                         │ │
│  │  - Database mapping                                   │ │
│  │  - Properties: id, name, email, course               │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────┘
                               │
                    JDBC / JPA ORM
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                  H2 In-Memory Database                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Table: students                                      │ │
│  │  ┌──────┬─────────┬──────────────────┬────────────┐  │ │
│  │  │ id   │ name    │ email            │ course     │  │ │
│  │  ├──────┼─────────┼──────────────────┼────────────┤  │ │
│  │  │ 1    │ John    │ john@example.com │ CS101      │  │ │
│  │  │ 2    │ Jane    │ jane@example.com │ MATH201    │  │ │
│  │  │ 3    │ Bob     │ bob@example.com  │ PHYS301    │  │ │
│  │  └──────┴─────────┴──────────────────┴────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

## Technology Stack Details

### Frontend Stack
- **React 18**: Modern UI library with hooks
- **Axios**: Promise-based HTTP client
- **Vite**: Ultra-fast build tool
- **Bootstrap 5**: CSS framework (via npm)
- **Custom CSS**: Dark theme styling

### Backend Stack
- **Spring Boot 3.1.0**: Opinionated Spring framework
- **Spring Data JPA**: Repository abstraction
- **Hibernate**: ORM implementation
- **H2 Database**: In-memory relational database
- **Lombok**: Reduces boilerplate code

## Data Flow

### Adding a Student (POST)
```
1. User fills form in StudentForm.jsx
2. Form validation (client-side)
3. Submit event triggered
4. Axios POST to /api/students
5. StudentController receives request
6. StudentService validates input
7. Student entity created
8. StudentRepository.save() called
9. H2 Database inserts record
10. Response sent back with new Student
11. App.jsx updates state
12. StudentTable re-renders with new student
13. Success message displayed
```

### Updating a Student (PUT)
```
1. User clicks Edit button
2. Student data loaded into form
3. User modifies data
4. Submit event triggered
5. Axios PUT to /api/students/{id}
6. StudentController updates student
7. StudentService validates and updates
8. StudentRepository.save() called
9. H2 Database updates record
10. Response sent back
11. App.jsx updates state
12. StudentTable re-renders
13. Form cleared, edit mode exits
```

### Deleting a Student (DELETE)
```
1. User clicks Delete button
2. Confirmation dialog shown
3. If confirmed, Axios DELETE to /api/students/{id}
4. StudentController receives DELETE request
5. StudentService deletes student
6. StudentRepository.deleteById() called
7. H2 Database removes record
8. Response sent back
9. App.jsx updates state (filter out deleted)
10. StudentTable re-renders without deleted student
```

### Fetching All Students (GET)
```
1. Page loads, useEffect runs
2. Axios GET to /api/students
3. StudentController returns all students
4. StudentService queries repository
5. StudentRepository.findAll() called
6. H2 Database returns all records
7. Array of Students sent back
8. App.jsx updates state
9. StudentTable renders all students
```

## Component Hierarchy

```
App (Root)
├── State Management
│   ├── students []
│   ├── loading boolean
│   ├── error string
│   ├── message string
│   └── editingStudent object
│
├── StudentForm
│   ├── Props:
│   │   ├── onSubmit (callback)
│   │   ├── editingStudent (data)
│   │   └── onEditingChange (callback)
│   │
│   └── State:
│       ├── formData {}
│       └── errors {}
│
└── StudentTable
    ├── Props:
    │   ├── students []
    │   ├── onDelete (callback)
    │   ├── onEdit (callback)
    │   └── loading boolean
    │
    └── Displays:
        ├── Loading state
        ├── No data message
        └── Table with data and actions
```

## API Specification

### Base URL
```
http://localhost:8080/api/students
```

### Endpoints

#### 1. GET /api/students
Get all students
```
Response: 200 OK
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "course": "CS101"
  },
  ...
]
```

#### 2. GET /api/students/{id}
Get student by ID
```
Response: 200 OK
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "course": "CS101"
}

Response: 404 Not Found
{
  "error": "Student not found with id: 999"
}
```

#### 3. POST /api/students
Create new student
```
Request:
{
  "name": "John Doe",
  "email": "john@example.com",
  "course": "CS101"
}

Response: 201 Created
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "course": "CS101"
}

Response: 400 Bad Request
(empty body - validation failed)
```

#### 4. PUT /api/students/{id}
Update student
```
Request:
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "course": "CS201"
}

Response: 200 OK
{
  "id": 1,
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "course": "CS201"
}

Response: 404 Not Found
{
  "error": "Student not found with id: 999"
}
```

#### 5. DELETE /api/students/{id}
Delete student
```
Response: 200 OK
{
  "message": "Student deleted successfully"
}

Response: 404 Not Found
{
  "error": "Student not found with id: 999"
}
```

## Error Handling Strategy

### Frontend Error Handling
- Form validation prevents invalid submissions
- Axios error interceptors catch network errors
- Error messages displayed in alert box
- User can dismiss errors
- Network failures caught and displayed

### Backend Error Handling
- Input validation in StudentService
- ResourceNotFoundException for missing students
- Global exception handler in StudentController
- HTTP status codes used properly
- Error messages returned in response body

## Database Schema

```sql
CREATE TABLE students (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  course VARCHAR(255) NOT NULL
);
```

## Security Considerations

### Current Implementation
- CORS enabled for localhost:3000 development
- Basic input validation
- No authentication (development only)

### Production Recommendations
- Add Spring Security
- Implement JWT authentication
- Restrict CORS to specific origins
- Add rate limiting
- Validate all inputs server-side
- Use HTTPS
- Add SQL injection protection
- Implement authorization checks

## Performance Considerations

### Frontend
- React's virtual DOM optimization
- Lazy loading with React.lazy() (future)
- Memoization for components (if needed)
- Debouncing form inputs (if needed)

### Backend
- In-memory H2 suitable for development
- For production, use persistent database
- Add caching layer if needed
- Connection pooling configured by default
- Query optimization for large datasets

## Deployment Notes

### Frontend Deployment
- Build: `npm run build`
- Output: static files in `dist/`
- Can be deployed to: Vercel, Netlify, GitHub Pages, Any static host
- Update API_BASE_URL for production

### Backend Deployment
- Build: `mvn clean package`
- Creates JAR file in `target/`
- Can be deployed to: AWS, Azure, Heroku, Docker, Any JVM host
- Use persistent database (MySQL, PostgreSQL)
- Set environment variables for configuration

## Testing Notes

### Manual Testing Checklist
- ✅ Add student with valid data
- ✅ Add student with invalid data (form validation)
- ✅ Edit student details
- ✅ Delete student with confirmation
- ✅ Delete student cancel confirms
- ✅ Reload page and data persists
- ✅ Error cases are handled

### Automated Testing (Can add)
- Unit tests for components
- Integration tests for API
- E2E tests with Cypress
- Database migration tests

---

This architecture provides a clean separation of concerns, scalable design, and follows industry best practices for full-stack development.
