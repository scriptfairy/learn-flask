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

### Flask

Install Flask:

```bash
$ pip install Flask
```

### Install Node

Install Node Version Manager

https://github.com/coreybutler/nvm-windows

### Install NPM packages

```bash
$ npm init
```

## Running the application

To run the application:

```bash
$ flask --app main.py --debug run
```

Then go to:

```
http://127.0.0.1:5000/
```

To exit the application use `Ctrl-C`.
