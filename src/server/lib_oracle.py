import oracledb
from config import get_oracledb_config


def get_connection():
    oracledb_config = get_oracledb_config()
    connection = oracledb.connect(
        user=oracledb_config["username"],
        password=oracledb_config["password"],
        dsn=oracledb_config["dsn"],
    )
    return connection
