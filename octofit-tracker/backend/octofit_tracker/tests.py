from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_user_creation(self):
        user = User.objects.create(name='Test User', email='test@example.com', team='Marvel')
        self.assertEqual(user.name, 'Test User')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.team, 'Marvel')

class TeamModelTest(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Marvel', members=['Iron Man', 'Captain America'])
        self.assertEqual(team.name, 'Marvel')
        self.assertIn('Iron Man', team.members)

class ActivityModelTest(TestCase):
    def test_activity_creation(self):
        activity = Activity.objects.create(user='Iron Man', activity='Running', duration=30)
        self.assertEqual(activity.user, 'Iron Man')
        self.assertEqual(activity.activity, 'Running')
        self.assertEqual(activity.duration, 30)

class LeaderboardModelTest(TestCase):
    def test_leaderboard_creation(self):
        leaderboard = Leaderboard.objects.create(team='Marvel', points=100)
        self.assertEqual(leaderboard.team, 'Marvel')
        self.assertEqual(leaderboard.points, 100)

class WorkoutModelTest(TestCase):
    def test_workout_creation(self):
        workout = Workout.objects.create(user='Batman', workout='Pushups', reps=50)
        self.assertEqual(workout.user, 'Batman')
        self.assertEqual(workout.workout, 'Pushups')
        self.assertEqual(workout.reps, 50)
