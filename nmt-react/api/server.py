from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json
import time

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

from pkg1.pozhtranslator import PoZhTranslator
from pkg2.rozhtranslator import RoZhTranslator


# FLASK Backend API
app = Flask(__name__)
CORS(app)

translator = PoZhTranslator()
@app.route('/translate', methods=['POST'])
def translate_processor():
	global translator
	content = request.json

	source_input = content["source"]
	uuid = content["uuid"]
	language = content["language"]
	print('language is',language)
	if language == "Polish":
		translator = PoZhTranslator()
		print('select polish')
	elif language =='Esthonian':
		translator = RoZhTranslator()
		print('select Esthonian')

	
	output = translator.translate(source_input)
	data = { \
		"uuid": str(uuid), \
		"language": language, \
		"time": time.strftime('%XT%xZ%Z'), \
		"source": source_input, \
		"output": output \
	}
	# print('the output is:',output)
	r = json.dumps(data, ensure_ascii=False)
	r = Response(response=r, status=200, mimetype="application/json")
	r.headers["Content-Type"] = "application/json; charset=utf-8"
	return r

if __name__ == "__main__":
	app.run(host= '0.0.0.0',debug=True)

