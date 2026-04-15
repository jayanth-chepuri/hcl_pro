package com.studentrecord;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
class HealthCheckController {
    @GetMapping
    public String healthCheck() {
        return "Backend is running!";
    }
}

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class StudentController {
    
    @Autowired
    private StudentService studentService;
    
  
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }
    
 
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }
    
 
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
  
        if (student.getName() == null || student.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (student.getEmail() == null || student.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (student.getCourse() == null || student.getCourse().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        Student createdStudent = studentService.createStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdStudent);
    }
    
 
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(
            @PathVariable Long id,
            @RequestBody Student studentDetails) {
        
  
        if (studentDetails.getName() == null || studentDetails.getName().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (studentDetails.getEmail() == null || studentDetails.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        if (studentDetails.getCourse() == null || studentDetails.getCourse().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        Student updatedStudent = studentService.updateStudent(id, studentDetails);
        return ResponseEntity.ok(updatedStudent);
    }
    
  
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.ok(Map.of("message", "Student deleted successfully"));
    }
    
   
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleResourceNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", ex.getMessage()));
    }
}
