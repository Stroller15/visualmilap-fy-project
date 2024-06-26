
# VisualMilap

VisualMilap is a web application that allows users to upload a cluster of photos and automatically separates photos of a specific person by scanning their face. This project utilizes the MERN stack, Flask backend, and a face detection API.

## Demo

## About the Project
In our final year college project, we, Shubham, Ashmita, and Tushar, built VisualMilap to solve the problem of manually sorting through numerous photos to find images of a specific person. The app leverages modern web technologies and machine learning to provide an efficient and user-friendly solution.

## Use Case
VisualMilap is designed for scenarios where you take several photos, such as at functions or events, and want to quickly find photos of yourself or someone else. By uploading all the photos to VisualMilap, you can scan a face and get only the photos containing that person.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js, Flask
- **Database**: MongoDB
- **Face Detection API**: Utilized for scanning and identifying faces in photos

## Installation
To run this project locally, follow these steps:

### Prerequisites
- Node.js
- MongoDB
- Python (for Flask backend)

- ### Steps
1. Clone the repository:

   ```
   git clone https://github.com/yourusername/VisualMilap.git
   cd VisualMilap
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies:
 ```
   cd ../backend
   npm install
  ```

4. Install Flask dependencies:
  ```
   pip install -r requirements.txt
```

5. Start the MongoDB server:
   ```
   mongod
   ```
7. Start the Flask backend:
   ```
   cd ../flask-backend
   flask run
   ```

7. Start the Node.js backend:
  ```
   cd ../backend
   npm start
 ```

8. Start the React frontend:
  ```
   cd ../frontend
   npm start
 ```



## Usage
1. Open your web browser and navigate to \`http://localhost:3000\`.
2. Upload a cluster of photos.
3. Scan your face using the face detection feature.
4. VisualMilap will display only the photos containing the scanned face.

## Contributors
- **Shubham** - [GitHub](https://github.com/Stroller15)
- **Ashmita** - [GitHub](https://github.com/Ashmita6901)
- **Tushar** - [GitHub](https://github.com/vats-tushar)


