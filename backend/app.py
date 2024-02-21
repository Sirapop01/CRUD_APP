from flask import Flask,jsonify,request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
products=[
{"id":0,"name":"Notebook Acer Swift","price":45900,"img":"https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg"},
{"id":1,"name":"Notebook Asus Vivo","price":19900,"img":"https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg"},
{"id":2,"name":"Notebook Lenovo Ideapad","price":32900,"img":"https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg"},
{"id":3,"name":"Notebook MSI Prestige","price":54900,"img":"https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg"},
{"id":4,"name":"Notebook DELL XPS","price":99900,"img":"https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg"},
{"id":5,"name":"Notebook HP Envy","price":46900,"img":"https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg"}];

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/products",methods=["GET"])
def get_all_products():
    return jsonify(products),200

@app.route("/products",medthods = ["POST"])
def create_product():
    data = request.get_json()
    new_pdt={
        "id":data["id"],
        "name":data["name"],
        "price":data["price"],
        "img":data["img"]
    }
    
    if any(products["id"] == new_pdt["id"] for products in products):
        return jsonify({"error":"Cannot create new studen"}),500
    else:
        products.append(new_pdt)
        return jsonify(products),200


if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)