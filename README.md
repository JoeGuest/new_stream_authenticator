# New Stream Authenticator
API that provides a simple true/false response to provided user ID

![New Stream Authenticator diagram](https://drive.google.com/uc?export=view&id=1USPkW4vMm49R8zqSWnDY7za2B6GbKUEl)

## Installing / Running

1. Clone the repo and `cd` to it.
2. Run `npm install`.
3. Run `npm start`.

Alternately, provided you already have the docker on your machine:

1. Clone the repo and `cd` to it.
2. Run `docker build -t new_stream_authenticator .` to build the docker image.
3. Run `docker run -p 8081:8081 new_stream_authenticator` to run the newly built image.

## Running test suite

1. `cd` to the root directory of this repo.
2. Run `npm run test`.

## Testing instructions
Use your web browser or favourite API tool (e.g. Postman, Paw) and call the below endpoints:

* http://localhost:8081/authenticate/123 - User with less than 3 active streams.
* http://localhost:8081/authenticate/987 - User with 3 active streams.
* http://localhost:8081/authenticate/[any_other_ID] - Unsuccessful user response by calling real endpoints (that return 404s).

## Scalability / Architecture
The authentication service has been built utilising async / await, preventing any blocking calls from occurring. The two separate API calls have been parallelised.
