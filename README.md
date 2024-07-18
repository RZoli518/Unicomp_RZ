Book review site

I'm creating this site as part of my application process at Unicomp.

The Backend folder contains the API the site will use in the future. It has CRUD oprations ready for storing data about and working with users, books and book reviews.

Frontend folder will be added in the days following the original commit of this file, completing the project.

Backend Setup:
    
    My package manager/library of choice:
        npm
    Dependencies:
        node
        nodemon
        mongodb
        express
        mongoose
        body-parser
        dotenv
        jsonwebtoken
        bcrypt
    Create .env file in the /Backend folder
    Environmental variables:
        PORT
        MONGO_URI
        SECRETKEY
    Database/SQL
        MongoDB
    Start options:
        'npm run start': Starts the backend.
        'npm run dev': Starts the backend using nodemon, it will automatically restart upon changes to project files
    Default port:
        The backend will run on the port 5000 unless specified otherwise in the .env file
    
    
