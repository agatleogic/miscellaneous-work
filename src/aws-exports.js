import { Auth, Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: "us-east-2:427b395e-7a51-47c5-8dd2-6496b7e2fe87",

    // REQUIRED - Amazon Cognito Region
    region: "us-east-2",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-2_mDKqqHEZz",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "478e4tm28dmu04ofjt3co0o8cc"
  },
  Storage: {
    AWSS3: {
      bucket: "prestocharts-e", //REQUIRED -  Amazon S3 bucket name
      region: "us-east-2"
    }
  }
});

// You can get the current config object
const currentConfig = Auth.configure();

export default currentConfig;
