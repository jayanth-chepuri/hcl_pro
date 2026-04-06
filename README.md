# Student Record Manager

A full-stack web application for managing student records with a React frontend and Spring Boot backend.

## Project Structure

```
StudentRecordManager/
├── backend/                 # Spring Boot REST API
│   ├── src/
│   │   ├── main/java/com/studentrecord/
│   │   │   ├── Student.java
│   │   │   ├── StudentRepository.java
│   │   │   ├── StudentService.java
│   │   │   ├── StudentController.java
│   │   │   ├── ResourceNotFoundException.java
│   │   │   └── StudentRecordManagerApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── pom.xml
│
└── frontend/                # React Frontend
    ├── src/
    │   ├── App.jsx
    │   ├── StudentForm.jsx
    │   ├── StudentTable.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Features

✅ Add new students with form validation
✅ View all students in a table
✅ Edit existing student information
✅ Delete students with confirmation
✅ Real-time error handling
✅ Responsive design with Bootstrap styling
✅ In-memory H2 database
✅ RESTful API endpoints

## Tech Stack

### Backend
- **Java** - Programming language
- **Spring Boot 3.1.0** - Web framework
- **Spring Data JPA** - Data access
- **H2 Database** - In-memory database
- **Maven** - Build tool

### Frontend
- **React 18** - UI library
- **Axios** - HTTP client
- **Vite** - Build tool
- **Bootstrap 5** - CSS framework

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher and npm
- Maven (for building Spring Boot)
- Git (optional)

## Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project with Maven:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

   Optional: Access H2 Console at `http://localhost:8080/h2-console`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will open at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/{id}` | Update student |
| DELETE | `/api/students/{id}` | Delete student |

### Request/Response Format

**Student Object:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "course": "CS101"
}
```

**POST/PUT Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "course": "CS101"
}
```

## Data Validation

### Frontend Validation
- **Name**: Required, cannot be empty
- **Email**: Required, must be valid email format
- **Course**: Required, cannot be empty

### Backend Validation
- **Name**: Required, non-empty string
- **Email**: Required, unique, valid email format
- **Course**: Required, non-empty string

## Error Handling

- Invalid form inputs display targeted error messages
- Network errors are caught and displayed to the user
- 404 errors when student is not found
- 400 errors for validation failures
- 500 errors for server issues

## Running the Application

### Both Services Must Run Simultaneously

**Terminal 1 - Backend:**
```bash
cd StudentRecordManager/backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd StudentRecordManager/frontend
npm run dev
```

Then navigate to `http://localhost:3000` in your browser.

## Usage

1. **Add Student**: Fill the form at the top and click "Add Student"
2. **View Students**: All students are displayed in the table below
3. **Edit Student**: Click the "Edit" button on any student row, modify details, and click "Update Student"
4. **Delete Student**: Click the "Delete" button on any student row (confirmation required)

## Database

The application uses an H2 in-memory database that:
- Automatically creates tables on startup
- Resets when the application stops
- Can be accessed via H2 Console at `http://localhost:8080/h2-console`

**H2 Console Credentials:**
- JDBC URL: `jdbc:h2:mem:studentdb`
- Username: `sa`
- Password: (leave blank)

## Build Commands

### Backend
```bash
mvn clean install      # Build
mvn spring-boot:run    # Run
mvn test              # Run tests
```

### Frontend
```bash
npm install           # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Troubleshooting

### Backend won't start
- Ensure Java 17+ is installed: `java -version`
- Check if port 8080 is available
- Verify Maven is installed: `mvn -version`

### Frontend won't start
- Ensure Node.js 16+ is installed: `node -version`
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

### CORS errors
- Ensure backend is running on port 8080
- Ensure frontend is running on port 3000
- Frontend is already configured with CORS enabled in StudentController

### H2 Database issues
- The database resets when the backend restarts
- Use H2 Console to verify database state
- Check `application.properties` for database configuration

## Future Enhancements

- Add search/filter functionality
- Implement pagination
- Add student photo upload
- Create reports/analytics
- Add authentication and authorization
- Implement soft deletes
- Add audit logging
- Create backup/restore features

## License

This project is open source and available under the MIT License.

## Author

Student Record Manager Application - Full Stack Development Example

---

**Happy Record Managing! 📚**
