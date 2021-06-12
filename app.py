from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.softwareengineer


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/memo/list', methods=['GET'])
def listing():
    diary = list(db.diary.find({}, {'_id': False}))
    return jsonify({'all_diary': diary})


@app.route('/memo/save', methods=['POST'])
def saving():
    title_receive = request.form['title_give']
    contents_receive = request.form['contents_give']
    image_receive = request.form['image_give']

    doc = {
        'title': title_receive,
        'contents': contents_receive,
        'image': image_receive
    }

    db.diary.insert_one(doc)

    return jsonify({'msg': 'Diary Saved!'})


@app.route('/memo/delete', methods=['POST'])
def deleting():
    title_receive = request.form['title_give']
    db.diary.delete_one({'title': title_receive})
    return jsonify({'msg': 'Diary deleted!'})


@app.route('/memo/edit', methods=['POST'])
def editing():
    title_receive = request.form['title_edit']
    contents_receive = request.form['contents_edit']
    image_receive = request.form['image_edit']

    doc = {
        'title': title_receive,
        'contents': contents_receive,
        'image': image_receive
    }
    db.diary.delete_one({'title': title_receive})
    db.diary.insert_one(doc)

    return jsonify({'msg': 'Diary edited!'})


@app.route('/signup_page')
def signup_page():
    return render_template('signup.html')


@app.route('/signup_page/signup', methods=['POST'])
def signup():
    email_receive = request.form['email_give']
    password_receive = request.form['password_give']

    doc = {
        'email': email_receive,
        'password': password_receive,
    }
    db.diary_users.insert_one(doc)

    return jsonify({'msg': 'You are signed up!'})


@app.route('/signin_page')
def signin_page():
    return render_template('signin.html')


@app.route('/signin_page/signin', methods=['GET'])
def signin():
    users = list(db.diary_users.find({}, {'_id': False}))
    return jsonify({'all_users': users})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
