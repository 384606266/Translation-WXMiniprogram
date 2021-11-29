from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json
import time
from onmt.translate import TranslationServer, ServerModelError
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

debug = True

translation_server = TranslationServer()
translation_server.start("./available_models/conf.json")
# FLASK Backend API
app = Flask(__name__)
CORS(app)

# translator = PoZhTranslator()
@app.route('/translate', methods=['POST'])
def translate_processor():

	content = request.json
	source_input = content["source"]
	uuid = content["uuid"]
	language = content["language"]
	if language=='Polish':
		id=101
	if language =='Esthonian':
		id=100
	inputs = [{"src":source_input,"id":id}]
	try:
		trans, scores, n_best, _, aligns = translation_server.run(inputs)
		assert len(trans) == len(inputs) * n_best
		assert len(scores) == len(inputs) * n_best
		assert len(aligns) == len(inputs) * n_best

		print('trans:',trans[0])
		trans_clean = trans[0].replace(' ','')
		print('final',trans_clean)
	except ServerModelError as e:
		model_id = inputs[0].get("id")
		if debug:
			print("Unload model #{} ""because of an error".format(model_id))

	data = { \
		"uuid": str(uuid), \
		"language": language, \
		"time": time.strftime('%XT%xZ%Z'), \
		"source": source_input, \
		"output": trans_clean \
	}
	print('the output is:',source_input)
	r = json.dumps(data, ensure_ascii=False)
	r = Response(response=r, status=200, mimetype="application/json")
	r.headers["Content-Type"] = "application/json; charset=utf-8"
	return r

if __name__ == "__main__":
	app.run(host= '0.0.0.0',debug=True)

