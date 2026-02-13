from django.core.management.base import BaseCommand
from djongo import models
from django.conf import settings
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Create unique index on email for users
        db.users.create_index([('email', 1)], unique=True)

        # Sample users
        users = [
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Captain America", "email": "cap@marvel.com", "team": "Marvel"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
            {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
        ]
        db.users.insert_many(users)

        # Sample teams
        teams = [
            {"name": "Marvel", "members": ["Iron Man", "Captain America"]},
            {"name": "DC", "members": ["Wonder Woman", "Batman"]},
        ]
        db.teams.insert_many(teams)

        # Sample activities
        activities = [
            {"user": "Iron Man", "activity": "Running", "duration": 30},
            {"user": "Wonder Woman", "activity": "Cycling", "duration": 45},
        ]
        db.activities.insert_many(activities)

        # Sample leaderboard
        leaderboard = [
            {"team": "Marvel", "points": 100},
            {"team": "DC", "points": 90},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Sample workouts
        workouts = [
            {"user": "Batman", "workout": "Pushups", "reps": 50},
            {"user": "Captain America", "workout": "Squats", "reps": 40},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
