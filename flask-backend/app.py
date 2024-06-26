# 3rd parth dependencies
from flask import Flask
from flask_cors import CORS, cross_origin
from deepface.api.src.modules.core.routes import blueprint

def create_app():
    app = Flask(__name__)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.register_blueprint(blueprint)
    return app
deepface_app = create_app()

if __name__ == '__main__':
    deepface_app.run(debug=True)