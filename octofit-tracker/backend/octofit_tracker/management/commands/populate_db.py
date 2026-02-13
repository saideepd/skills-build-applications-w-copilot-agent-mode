from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from pymongo import MongoClient
 

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Use Django ORM for create/delete so Djongo populates PKs correctly
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create sample users via ORM
        users = [
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "Marvel"},
            {"name": "Captain America", "email": "cap@marvel.com", "team": "Marvel"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "DC"},
            {"name": "Batman", "email": "batman@dc.com", "team": "DC"},
        ]
        for u in users:
            User.objects.create(**u)

        teams = [
            {"name": "Marvel", "members": ["Iron Man", "Captain America"]},
            {"name": "DC", "members": ["Wonder Woman", "Batman"]},
        ]
        for t in teams:
            Team.objects.create(**t)

        activities = [
            {"user": "Iron Man", "activity": "Running", "duration": 30},
            {"user": "Wonder Woman", "activity": "Cycling", "duration": 45},
        ]
        for a in activities:
            Activity.objects.create(**a)

        leaderboard = [
            {"team": "Marvel", "points": 100},
            {"team": "DC", "points": 90},
        ]
        for l in leaderboard:
            Leaderboard.objects.create(**l)

        workouts = [
            {"user": "Batman", "workout": "Pushups", "reps": 50},
            {"user": "Captain America", "workout": "Squats", "reps": 40},
        ]
        for w in workouts:
            Workout.objects.create(**w)

        # Ensure unique index on email using pymongo directly
        try:
            client = MongoClient('localhost', 27017)
            db = client['octofit_db']
            db.users.create_index([('email', 1)], unique=True)
        except Exception:
            pass

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data (ORM).'))
