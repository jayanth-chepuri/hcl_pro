# Build stage
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-focal
WORKDIR /app
# Note: The JAR name depends on your pom.xml artifactId and version
COPY --from=build /app/target/student-record-manager-1.0.0.jar app.jar
ENV JAVA_OPTS="-Xmx384m -Xms256m"
CMD ["sh", "-c", "java $JAVA_OPTS -Dserver.port=${PORT} -jar app.jar"]
