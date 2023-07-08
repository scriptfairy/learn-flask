# learn-flask

## First time setup

### Python Virtual Environment

Create a Python Virtual Environment:

```bash
$ python3 -m venv .venv
```

Activate the Python environment:

```bash
$ .venv\\Scripts\\activate
```

### Dependencies

```bash
$ python -m pip install Flask
$ python -m pip install openapi
$ python -m pip install oracledb (driver)
```

Each type of database needs different type of drivers

### Install Node

Install Node Version Manager

https://github.com/coreybutler/nvm-windows

### Install NPM packages

```bash
$ npm init
```

### Set the Open AI API Key

Set an environment variable named `OPENAI_API_KEY` to be able to use the Open AI code.

## Running the application

To run the application:

```bash
$ npm run dev
```

Then go to:

```
http://127.0.0.1:5000/
```

To exit the application use `Ctrl-C`.

After generating the OPENAI_API_KEY save it in Environment Variables under User variables.

### Set OpenAI account

After login to the account:

1. Generate the API key and store it in the Environment Vars (user vars)

2. Setup the account payment method and privide the credit card and other information

3. In the account Usage Limits, set the soft and the hard limits

### References

https://github.com/openai/openai-cookbook
