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
The authentication service has been built utilising async / await, preventing any blocking calls from occurring. The two separate API calls to the external services have been parallelised.

The app is stateless, making it easier to scale without needing to be concerned about database query bottlenecks. See examples below for two implementations:

### AWS Elastic Beanstalk
Elastic Beanstalk can deploy, monitor, manage, and scale applications for you. Some of the more useful options available are the custom Auto Scaling settings they provide, to spin up extra EC2 instances if required. There's a convenient Docker platform that allows Docker-ised images to be uploaded fairly easily (I just zipped up my project and uploaded it via their Getting Started guide).

Note: Load balancing is not available on the AWS Free Tier I signed up to as part of this exercise, and the resources I have available are limited (e.g. 750 hours of EC2 t2.micro instances a month).

* http://newstreamauthenticator-env.iqbvv7yxvj.eu-west-2.elasticbeanstalk.com/authenticate/123 - User with less than 3 active streams.
* http://newstreamauthenticator-env.iqbvv7yxvj.eu-west-2.elasticbeanstalk.com/authenticate/987 - User with 3 active streams.
* http://newstreamauthenticator-env.iqbvv7yxvj.eu-west-2.elasticbeanstalk.com/authenticate/[any_other_ID] - Unsuccessful user response by calling real endpoints (that return 404s).

### AWS Lambda
Lambda is an implementation of serverless architecture. With no servers to manage, you can focus on writing the important parts of the app and not need to worry about configuring servers and setting scaling rules. Lambda uses node 8.10 (the reason I used this version for my app).

I used a package named Claudia to convert this Express.js app to a Lambda function that sits behind API Gateway, but you could quite easily just write these functions individually rather converting an existing app like I have done. This also required me to convert it using Babel back to ES5 for uploading the Lambda function with the `create-serverless` script in package.json.

Note: The AWS Free Tier allows 1 million requests each month.

* https://ab1leem6cg.execute-api.eu-west-2.amazonaws.com/latest/authenticate/123 - User with less than 3 active streams.
* https://ab1leem6cg.execute-api.eu-west-2.amazonaws.com/latest/authenticate/987 - User with 3 active streams.
* https://ab1leem6cg.execute-api.eu-west-2.amazonaws.com/latest/authenticate/[any_other_ID] - Unsuccessful user response by calling real endpoints (that return 404s).
