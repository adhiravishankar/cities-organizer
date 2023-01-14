FROM golang:latest as builder

# Creates an app directory to hold your app’s source code
WORKDIR /app

# Copies everything from your root directory into /app
COPY . .

# Installs Go dependencies
RUN go mod download

# Builds your app with optional configuration
RUN go build -o /go-cities

# Pull alpine
FROM gcr.io/distroless/base-debian11

#Copies golang build file
COPY --from=builder /go-cities /go-cities

# Copies env file
COPY app.env /app.env

# Tells Docker which network port your container listens on
EXPOSE 7003

# Specifies the executable command that runs when the container starts
CMD [ "/go-cities" ]