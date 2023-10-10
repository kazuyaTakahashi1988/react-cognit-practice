import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";

export class CdkCognitoUserpoolStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const testUserpool = new cognito.UserPool(this, "testuserpool", {
      /**
       * you can specify userPoolName if not cloudformation will generate a name
       */
      userPoolName: "test-userpool",
      /**
       * if false user can only be invided by admin
       */
      selfSignUpEnabled: true,

      /**
       * customizing verification email
       */
      userVerification: {
        emailStyle: cognito.VerificationEmailStyle.CODE,
        emailSubject: "test email verification",
        emailBody:
          "Thanks for signing up to test Your verification code is {####}",
      },
      /**
       * customising admin invite
       */
      userInvitation: {
        emailSubject: "Invitation to join test",
        emailBody:
          "Hello {username}, you have been invited to join test. Your temporary password is {####}",
      },
      /**
       * ways by which users can signin
       * 4 options --> username, email, phone, preferredUsername
       *
       */
      signInAliases: { email: true },
      /**
       * cognito will request verification for following
       */
      autoVerify: { email: true },
      signInCaseSensitive: false,

      passwordPolicy: {
        minLength: 6,
        requireDigits: true,
        requireLowercase: false,
        requireUppercase: false,
        requireSymbols: false,
      },

      /**
       * Standard attributes that cognito supports
       * if required user wont be able to signup unless that attribute is provided
       */
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        fullname: {
          required: false,
          mutable: true,
        },
        gender: {
          required: false,
          mutable: true,
        },
      },
      /**
       * custom attributes for a user
       * max 50
       */
      customAttributes: {
        isAdmin: new cognito.BooleanAttribute({ mutable: true }),
        level: new cognito.StringAttribute({ mutable: true }),
      },

      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,

      /**
       * The email from which cognito sends email
       * for higher volume use Amazon SES
       */
      email: cognito.UserPoolEmail.withCognito("info@test.com"),

      /**
       * Deletes the userpool on cdk destroy
       * default is RETAIN
       */
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    /**
     * userpool client permissions to write read attributes
     */

    const clientWriteAttributes = new cognito.ClientAttributes()
      .withStandardAttributes({ email: true, fullname: true, gender: true })
      .withCustomAttributes("isAdmin", "level");

    const clientReadAttributes = clientWriteAttributes
      .withStandardAttributes({
        email: true,
        fullname: true,
        gender: true,
        emailVerified: true,
        preferredUsername: true,
      })
      .withCustomAttributes("isAdmin", "level");

    /**
     * Adding userpool client
     */

    const userpoolClient = testUserpool.addClient("app-client", {
      userPoolClientName: "test-app-client",

      readAttributes: clientReadAttributes,
      writeAttributes: clientWriteAttributes,
    });

    /**
     * print values to console
     */
    new cdk.CfnOutput(this, "aws_user_pools_id", {
      value: testUserpool.userPoolId,
    });

    new cdk.CfnOutput(this, "aws_user_pools_web_client_id", {
      value: userpoolClient.userPoolClientId,
    });
  }
}