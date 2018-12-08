# New Stream Authenticator
API that provides a simple true/false response to provided user ID

# Testing instructions
Use your web browser or favourite API tool (e.g. Postman, Paw) and call the below endpoints:

* http://localhost:8081/authenticate/123 - Successful user response
* http://localhost:8081/authenticate/987 - Unsuccessful user response
* http://localhost:8081/authenticate/<any other ID> - Unsuccessful user response by calling real endpoints
