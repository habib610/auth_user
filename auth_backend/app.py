from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from werkzeug.security import check_password_hash, generate_password_hash
import jwt
import json
from datetime import datetime, timedelta
from flask_cors import CORS

app = Flask(__name__)


app.config['MONGO_URI'] = "mongodb+srv://auth_user:HaMakHSfIcUYuAth@cluster0.m9uhr.mongodb.net/authUser?retryWrites=true&w=majority"

mongo = PyMongo(app)
CORS(app)

@app.route('/', methods=["GET"])
def home_fun():
    return jsonify({"Message": "Server is running"})




# register
@app.route('/register', methods=["POST"] )
def register_new_user():
    data = request.json
    if mongo.db.userList.find_one({ "email": data['email'] }):
        return jsonify({"error": "email is already in used"}), 400
    else:
        try:
            front_user = {
                "firstName" : data['firstName'],
                "lastName" : data['lastName'],
                "email" : data['email'],
                "phoneNumber" : data['phoneNumber'],
                "password" : generate_password_hash(data['password']),
                "token": jwt.encode({
                    "firstName" : data['firstName'],
                    "lastName" : data['lastName'],
                    "exp": str(datetime.utcnow() + timedelta(minutes=5))
                    }, "secretjwtkey", algorithm="HS256")
            }
            user = mongo.db.userList.insert_one(front_user)
            print(user)
            return jsonify({"message": "user created successfully", "firstName" : front_user['firstName'],"lastName" : front_user['lastName'],"email" : front_user['email'],"phoneNumber" : front_user['phoneNumber'],"token": front_user['token'] })
        except Exception as ex:
                print(ex)
                return Response(
                    response=
                    json.dumps({"error": "Can not Register New User"}),
                    status=500,
                    mimetype="application/json"
                )

# singin
@app.route('/signin', methods=["POST"])
def user_sign_in():
    data = request.json
    existing_user = mongo.db.userList.find_one({ "email": data['email'] })
    if existing_user:
        if check_password_hash(existing_user['password'], data['password']):
            return jsonify({"message": "user created successfully", "firstName" : existing_user['firstName'],"lastName" : existing_user['lastName'],"email" : existing_user['email'],"phoneNumber" : existing_user['phoneNumber'],"token": existing_user['token'] })
        else:
            return jsonify({"error": "Password doesnot matched"}), 401
        return jsonify({"error": "User is able to signin"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401
    return jsonify({"error": "Unable to singin"}), 500

if __name__ == "__main__":
    app.run(debug=True)