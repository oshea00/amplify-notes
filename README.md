# Amplify Example CRUD
* Auth - User signin/account/reset component - Cognito
* Api - CRUD over a simple notes DynamoDB table
* Hosting - Static S3 hosting.

## After Cloning
This is a React application created with npm create-react-app, so all the things apply for running/testing/building the static sire for deployment.

Note: you may need/want to copy your static site to another server/instance depending if static S3 deployment is possible with your AWS account.

* Install the Amplify CLI https://docs.amplify.aws/cli/start/install
* Review https://docs.amplify.aws/cli/start/workflows
* From project root run `npm install`
* `amplify init` - Use "dev" environment and existing profile 'default' (your AWS account)
Note. This is an example and once you've run `amplify init` and set this up, a team-provider-info.json file will be added to the amplify folder in your project assocaiting with your AWS account. For team development, see the documentation. The gitignore for this project excludes this amplify-generated file as the project is an example and will usually be installed and run by different devs and on different accounts.

## To deploy
* `amplify push`
* `amplify status`

## Run
* `npm start`

## React
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
In the project directory, you can run:
## `npm start` - Run test server
## `npm run build` - create static site build

