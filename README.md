# Amplify Example CRUD
* Auth - User signin/account/reset component - Cognito
* Api - CRUD over a simple notes DynamoDB table
* Hosting - Static S3 hosting.

## After Cloning
This is a React application created with npm create-react-app, so all the things apply for running/testing/building the static site for deployment.

### Prerequisites

#### AWS CLI and Account
* If needed. Install the Amplify CLI https://docs.amplify.aws/cli/start/install
* run `aws configure` - note if running on an EC2 instance using an instance role, you will not need to enter AWS ID or AWS SECRET, just need to provide your region (example: us-east-1). This will create the minimal `~/.aws/config`. Amplify will then prompt for a "profile" which should be "default" unless you've already setup one under a different name or are using multiple AWS accounts - in which case enter the one you are targeting.

#### Publishing
* Review https://docs.amplify.aws/cli/start/workflows - for team environments see that subject in the Amplify docs.
* From project root run `npm install`
* `amplify init` - you will be prompted to create a new environment, I'd suggest using a unique tag like first_initial+last_name.
* `amplify publish` - this will create a cloud formation deployment and run it.

Two S3 buckets will be created with names containing the username tag you entered as the environment. You can find in the console filtering on that env tag.  One will be for deploying project builds, the other will be a static site containing the react application static build from `npm run build`.

If running in a restricted AWS account you may need to adjust settings on these buckets for encryption, access logging, and versioning. Also, static hosting from S3 may not be possible - turn off static hosting in addition to the other settings you may need.

## To deploy changes
* `amplify push`
* `amplify status`

## Run development server
* `npm start`
Note: add .ENV file with `PORT=8080` (to change port you want to test on - default is 3000).

## React
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run:
## `npm start` - Run test server
## `npm run build` - create static site build
You can copy the `build` folder contents to a web server.


