import Amplify from 'aws-amplify';

Amplify.configure({
    Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        //identityPoolId: 'XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab', 
        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1', 
        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_5O1UNvMFk',
        // OPTIONAL - Amazon Cognito Web Client ID
        userPoolWebClientId: '1c370gqjhqsj6k13jq3qb9ip9u', 
    }
});
