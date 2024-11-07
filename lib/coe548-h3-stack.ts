import { Stack, StackProps } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Construct } from "constructs";

export class Coe548H3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create Lambda functions
    const addLambda = this.createLambda(
      "AddLambda",
      "add.lambda_handler",
      "lambda/add",
    );
    const subLambda = this.createLambda(
      "SubLambda",
      "sub.lambda_handler",
      "lambda/sub",
    );
    const mulLambda = this.createLambda(
      "MulLambda",
      "mul.lambda_handler",
      "lambda/mul",
    );
    const divLambda = this.createLambda(
      "DivLambda",
      "div.lambda_handler",
      "lambda/div",
    );

    // Create an HTTP API Gateway
    const httpApi = new apigatewayv2.HttpApi(this, "ArithmeticHttpApi", {
      apiName: "ArithmeticService",
      description: "API Gateway V2 HTTP API for arithmetic operations",
    });

    // Add routes to the HTTP API for each Lambda function
    this.addApiRoute(httpApi, addLambda, "add");
    this.addApiRoute(httpApi, subLambda, "sub");
    this.addApiRoute(httpApi, mulLambda, "mul");
    this.addApiRoute(httpApi, divLambda, "div");

    new cdk.CfnOutput(this, "ApiUrl", {
      value: httpApi.apiEndpoint,
      description: "URL of the API Gateway",
    });
  }

  // Helper method to create Lambda functions
  private createLambda(
    id: string,
    handler: string,
    asset: string,
  ): lambda.Function {
    return new lambda.Function(this, id, {
      runtime: lambda.Runtime.PYTHON_3_11,
      code: lambda.Code.fromAsset(asset),
      handler: handler,
    });
  }

  // Helper method to add API Gateway V2 route for a Lambda function
  private addApiRoute(
    httpApi: apigatewayv2.HttpApi,
    lambdaFunction: lambda.Function,
    routePath: string,
  ): void {
    const integration = new integrations.HttpLambdaIntegration(
      `${routePath}Integration`,
      lambdaFunction,
    );

    httpApi.addRoutes({
      path: `/${routePath}`,
      methods: [apigatewayv2.HttpMethod.POST],
      integration: integration,
    });
  }
}
