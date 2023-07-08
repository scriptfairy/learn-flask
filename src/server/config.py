import os


def get_env(name):
    value = os.getenv(name)
    assert value is not None, "Environment variable '" + name + "' not found."
    return value


def get_openai_config():
    openai_config = {"api_key": get_env("OPENAI_API_KEY")}
    return openai_config


def get_oracledb_config():
    oracledb_config = {
        "username": get_env("ORACLEDB_USERNAME"),
        "password": get_env("ORACLEDB_PASSWORD"),
        "dsn": get_env("ORACLEDB_DSN"),
    }
    return oracledb_config


# def get_config():
#     openai = get_openai_config()
#     oracledb = get_oracledb_config()
#     config = {"openai": openai, "oracledb": oracledb}
#     return config
