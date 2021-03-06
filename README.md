# API Routes

## Auth Routes

- [x] POST /v1/auth/register
- [x] POST /v1/auth/login - login
- [x] POST /v1/auth/refresh-tokens - refresh auth tokens
- [x] POST /v1/auth/forgot-password - send reset password email
- [x] POST /v1/auth/reset-password - reset password
- [x] POST /v1/auth/send-verification-email - send verification email
- [x] GET /v1/auth/verify-email

## User Routes

- [x] POST /v1/users - create a user
- [x] GET /v1/users - get all users
- [x] GET /v1/users/:userId - get user
- [x] PATCH /v1/users/:userId - update user
- [x] DELETE /v1/users/:userId - delete user

## Station
- [x] POST /v1/station - register station
- [x] GET /v1/station - get all stations
- [x] GET /v1/station/:stationId - get specific station
- [x] PATCH /v1/station/:stationId - update specific station
- [x] DELETE /v1/station/:stationId - remove specific station

## Measurement
- [x] POST /v1/measurement - create new measurement
- [x] GET /v1/measurement - get all measurements
- [x] GET /v1/measurement/:measurementId - get specific measurement
