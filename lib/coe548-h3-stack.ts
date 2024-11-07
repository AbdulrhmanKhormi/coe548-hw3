import { Stack, StackProps } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigatewayv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { Construct } from "constructs";

export class Coe548H3Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdas_names = ["add", "sub", "mul", "div"];

    const lambdas = lambdas_names.reduce(
      (acc, name) => {
        acc[name] = new lambda.Function(this, `${name}Lambda`, {
          runtime: lambda.Runtime.PYTHON_3_11,
          code: lambda.Code.fromAsset(`lambda/${name}`),
          handler: `${name}.lambda_handler`,
        });
        return acc;
      },
      {} as Record<string, lambda.Function>,
    );

    const httpApi = new apigatewayv2.HttpApi(this, "ArithmeticHttpApi", {
      apiName: "ArithmeticService",
      description: "API Gateway V2 HTTP API for arithmetic operations",
    });

    lambdas_names.forEach((name) => {
      httpApi.addRoutes({
        path: `/${name}`,
        methods: [apigatewayv2.HttpMethod.POST],
        integration: new integrations.HttpLambdaIntegration(
          `${name}Integration`,
          lambdas[name],
        ),
      });
    });

    new cdk.CfnOutput(this, "ApiUrl", {
      value: httpApi.apiEndpoint,
      description: "URL of the API Gateway",
    });
  }
}
