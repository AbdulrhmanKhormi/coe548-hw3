import json


def lambda_handler(event, context):
    # Extract input values
    try:
        body = json.loads(event["body"])
        num1 = int(body["X"])
        num2 = int(body["Y"])
    except (TypeError, KeyError, ValueError) as e:
        return {
            "statusCode": 400,
            "body": json.dumps(
                {"error": f"Invalid or missing parameters 'X' and 'Y'\n {e}"}
            ),
        }

    # Perform the operation based on the function
    result = num1 * num2

    # a Python object (dict):
    response = {"X": num1, "Y": num2, "result": result}

    return {"statusCode": 200, "body": json.dumps(response)}
