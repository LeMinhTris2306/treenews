from pymongo import MongoClient

class MongoDB:
    def __init__(self, uri: str, db_name: str):
        # Khởi tạo client MongoDB
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def get_collection(self, collection_name: str):
        return self.db[collection_name]