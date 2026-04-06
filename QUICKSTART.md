# Quick Start Guide

## One-Click Startup (Two Terminals)

### Terminal 1: Start Backend
```bash
cd StudentRecordManager/backend
mvn clean install
mvn spring-boot:run
```
✅ Backend will start on `http://localhost:8080`

### Terminal 2: Start Frontend
```bash
cd StudentRecordManager/frontend
npm install
npm run dev
```
✅ Frontend will open at `http://localhost:3000`

---

## What You Get

### Backend (Spring Boot on port 8080)
- ✅ REST API for student management
- ✅ H2 in-memory database (auto-initialized)
- ✅ Complete CRUD operations
- ✅ Input validation
- ✅ Error handling

### Frontend (React on port 3000)
- ✅ Clean, modern UI with Bootstrap styling
- ✅ Form to add/edit students
- ✅ Table to view all students
- ✅ Delete with confirmation
- ✅ Real-time error messages
- ✅ Responsive design

---

## Features at a Glance

| Feature | Status |
|---------|--------|
| Add Students | ✅ |
| View Students | ✅ |
| Edit Students | ✅ |
| Delete Students | ✅ |
| Form Validation | ✅ |
| Error Handling | ✅ |
| Responsive Design | ✅ |
| Bootstrap Styling | ✅ |
| REST API | ✅ |
| H2 Database | ✅ |

---

## Project Files

### Backend Files Created:
- `pom.xml` - Maven configuration
- `Student.java` - JPA entity
- `StudentRepository.java` - JPA repository
- `StudentService.java` - Business logic
- `StudentController.java` - REST endpoints
- `ResourceNotFoundException.java` - Custom exception
- `StudentRecordManagerApplication.java` - Main class
- `application.properties` - H2 config

### Frontend Files Created:
- `App.jsx` - Main component with state management
- `StudentForm.jsx` - Form component
- `StudentTable.jsx` - Table component
- `main.jsx` - React entry point
- `index.css` - Styling
- `package.json` - Dependencies
- `vite.config.js` - Build config
- `index.html` - HTML template

---

## Testing the Application

### Test Add Student:
1. Fill the form at the top
2. Click "Add Student"
3. Student appears in the table below

### Test Edit Student:
1. Click "Edit" button on any row
2. Modify the details
3. Click "Update Student"
4. Changes appear in table

### Test Delete Student:
1. Click "Delete" button on any row
2. Confirm deletion
3. Student is removed from table

---

## Database

H2 In-Memory Database:
- **Location**: In-memory (resets on restart)
- **Console**: http://localhost:8080/h2-console
- **Login**: Username `sa`, Password blank
- **JDBC URL**: `jdbc:h2:mem:studentdb`

---

## Troubleshooting

### Issue: "Cannot reach backend"
**Solution**: Ensure backend is running with `mvn spring-boot:run`

### Issue: "Port 8080 already in use"
**Solution**: Kill process on port 8080 or change port in `application.properties`

### Issue: "npm dependencies not found"
**Solution**: Run `npm install` in frontend directory

### Issue: "Java not found"
**Solution**: Install Java 17+ and set JAVA_HOME environment variable

---

## API Endpoints Reference

```bash
# Get all students
GET http://localhost:8080/api/students

# Get student by ID
GET http://localhost:8080/api/students/1

# Add new student
POST http://localhost:8080/api/students
Body: {"name": "John", "email": "john@test.com", "course": "CS101"}

# Update student
PUT http://localhost:8080/api/students/1
Body: {"name": "John", "email": "john@test.com", "course": "CS101"}

# Delete student
DELETE http://localhost:8080/api/students/1
```

---

## Next Steps

After running the application:
1. Test adding a few students
2. Try editing and deleting
3. Check the H2 console to see database records
4. Review the code to understand the architecture
5. Customize styling or add new features!

---

Enjoy! 🚀
