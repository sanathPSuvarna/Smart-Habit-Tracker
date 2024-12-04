
Installation

Clone the Repository
git clone https://github.com/your-username/smart-habit-tracker.git
cd smart-habit-tracker
Install Dependencies Run the following command to install the required npm packages:

npm install
Configure the Environment Create a .env file in the project root and configure it as needed. Example:

STORAGE_TYPE=sqlite  # Options: 'file' or 'sqlite'
REMINDER_TIME=09:00  # Daily reminder time
Running the Application
Start the Server

node app.js
API Endpoints Use the following endpoints to interact with the habit tracker:

POST /habits - Add a new habit.
GET /habits - Fetch all habits.
PUT /habits/:id - Update a habit.
DELETE /habits/:id - Delete a habit.
GET /habits/weekly-report - Generate a weekly progress report.

Access the Application By default, the server runs on http://localhost:3000.
