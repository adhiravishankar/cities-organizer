FROM amazoncorretto:17-alpine as builder

# Copy application directory to app dir
COPY . /app

# Change workdir to app dir
WORKDIR /app

# Enable gradlew script
RUN chmod +x gradlew

# Run build script
RUN ./gradlew build

RUN mv /app/build/libs/* /app/build/libs/app.jar

FROM amazoncorretto:17-alpine

COPY --from=builder /app/build/libs/app.jar /app/app.jar

EXPOSE 7004

CMD [ "java", "-jar", "/app/app.jar"]