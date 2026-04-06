# Backend Configuration Examples

## Default Configuration (application.properties)
The default configuration uses an in-memory H2 database.

## Custom Configurations

### Use MySQL (Optional Alternative)
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/student_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
spring.jpa.hibernate.ddl-auto=update
```

### Use PostgreSQL (Optional Alternative)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/student_db
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL10Dialect
spring.jpa.hibernate.ddl-auto=update
```

### Logging Configuration
Add to application.properties:
```properties
logging.level.root=INFO
logging.level.com.studentrecord=DEBUG
logging.level.org.springframework.web=DEBUG
```

### Server Configuration
```properties
server.port=8080
server.servlet.context-path=/api
server.compression.enabled=true
server.compression.min-response-size=1024
```

Note: For this project, the default H2 configuration is recommended for quick setup and testing.
