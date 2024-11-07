# Coe548 HW3

To deploy the stack you should have nodejs and aws cdk installed, to install aws cdk run:

npm install -g aws-cdk

If you get permission error run this:

sudo npm install -g aws-cdk

After cdk is installed run command below to install required packages:

npm install

You should have aws access key and secret key stored in:

- Windows: (%USERPROFILE%\.aws\credentials).
- Linux and MacOS: (~\.aws\credentials).

## Run this command `cdk deploy` to deploy the stack

### the command will output something like this

```sh
Outputs:
Coe548H3Stack.ApiUrl = https://ma13chv8bh.execute-api.us-east-1.amazonaws.com
Stack ARN:
arn:aws:cloudformation:us-east-1:211125354201:stack/Coe548H3Stack/f5adc5d0-9cd8-11ef-a5ba-12ac9e8fdcf1
```

### put the url in test_api.sh this will work on Linux systems

### then run the below

```sh
chmod +x test_api.sh
./test_api.sh
```

### the output should look like this

```sh
Testing add endpoint...
Response from add: {"X":5,"Y":3,"result":8}

Testing sub endpoint...
Response from sub: {"X":10,"Y":4,"result":6}

Testing mul endpoint...
Response from mul: {"X":7,"Y":6,"result":42}

Testing div endpoint...
Response from div: {"X":20,"Y":4,"result":5}
```

### to delete the stack run `cdk destroy`
