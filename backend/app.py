from flask import Flask,jsonify,request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

app = Flask(__name__)
CORS(app)

uri = "mongodb+srv://products:products123456@cluster0.loxr4ax.mongodb.net/"
client = MongoClient(uri, server_api = ServerApi('1'))
client.admin.command('ping')
db = client["products"]  
collection = db["pdt_info"]



@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/products",methods=["GET"])
def get_all_products():
    products = collection.find()
    product_list = [record for record in products]
    return jsonify(product_list),200

@app.route("/products",methods = ["POST"])
def create_product():
    data = request.get_json()
    
    if collection.find_one({"_id": data["_id"]}):
        return jsonify({"error":"Cannot create new product"}),500
    collection.insert_one(data)
    return jsonify({"success":'Record inserted successfully'}),200


@app.route("/products/<int:pdt_id>", methods=["PUT"])
def update_product(pdt_id):
    data = request.get_json()

    if not collection.find_one({"_id": pdt_id}):
        return jsonify({'error': f'Record with ID {pdt_id} does not exist'}), 404

    # Exclude the _id field from the update operation
    data.pop('_id', None)

    filter_criteria = {"_id": pdt_id}
    update_data = {"$set": data}
    result = collection.update_one(filter_criteria, update_data)

    return jsonify({
        'matched_count': result.matched_count,
        'modified_count': result.modified_count,
    }), 200


@app.route("/products",methods=["Delete"])
def delete_product():
    return
if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)