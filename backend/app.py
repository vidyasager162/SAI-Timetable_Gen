from flask import Flask, request
import json

app = Flask(__name__)

@app.route('/create-new-schedule', methods=['POST'])
def createNewStudentSchedule():
    data = request.get_json()
    print(data)

    return json.dumps({
        "schedule": data['schedule'],
        "subjectsOfTeacher": data['subjectsOfTeacher']
    })

if __name__ == "__main__":
    app.run(port=5000)