import { Stack, StackProps } from "aws-cdk-lib";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
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

    const restApi = new apigateway.RestApi(this, "ArithmeticRestApi", {
      restApiName: "ArithmeticService",
      description: "API Gateway REST API for arithmetic operations",
    });

    lambdas_names.forEach((name) => {
      const resource = restApi.root.addResource(name);
      resource.addMethod(
        "POST",
        new apigateway.LambdaIntegration(lambdas[name]),
      );
    });

    new cdk.CfnOutput(this, "ApiUrl", {
      value: restApi.url,
      description: "URL of the API Gateway",
    });
  }
}
