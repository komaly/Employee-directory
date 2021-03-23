"""
populateDatabase.py

This script is run via "python /path/to/project/scripts/populateDatabase.py" in the command line.
This should be run once the MongoDB service is up to populate the database with employee entries.
"""

import pymongo
import random
from randomuser import RandomUser

myclient = pymongo.MongoClient("mongodb://root:example@127.0.0.1:27017/employees?authSource=admin")

mydb = myclient["employees"]
mycol = mydb["employees"]

userlist = RandomUser.generate_users(500)
jobs = ["Software engineer", "Pediatrician", "Chef", "Mechanic", "Actor", "Dancer", "Nurse", "Librarian", "Musician", "Scientist", "Waiter", "Astronaut", "Dentist", "Lawyer", "Magician"]
departments = ["Service", "Research", "Management", "Production", "Quality Assurance", "Finance", "Information Technology"]

resultinglist = []
for user in userlist:
    resultinglist.append({
        'first_name': user.get_first_name(),
        'last_name': user.get_last_name(),
        'address': {
            'street': user.get_street(),
            'city': user.get_city(),
            'state': user.get_state(),
            'country': user.get_country(),
            'zip_code': user.get_postcode(),
        },
        'phone_number': user.get_phone(),
        'email': user.get_email(),
        'picture': user.get_picture(),
        'job_title': random.choice(jobs),
        'department': random.choice(departments)
    })

mycol.insert_many(resultinglist)