FROM amazoncorretto:17-alpine

# Copy application directory to app dir
COPY . /app

# Change workdir to app dir
WORKDIR /app

# Enable gradlew script
RUN chmod +x gradlew

# Run build script
RUN ./gradlew build

RUN mv /app/build/libs/* /app/build/libs/app.jar

EXPOSE 7004

CMD [ "java", "-jar", "/app/build/libs/app.jar"]