from lib_oracle import get_connection


def find_tests():
    db = get_connection()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM TEST")
    data = cursor.fetchall()
    return data
