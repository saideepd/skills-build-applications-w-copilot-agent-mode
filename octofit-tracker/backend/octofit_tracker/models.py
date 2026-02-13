from djongo import models


class User(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=50)

    class Meta:
        db_table = 'users'


class Team(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    members = models.JSONField()

    class Meta:
        db_table = 'teams'


class Activity(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    user = models.CharField(max_length=100)
    activity = models.CharField(max_length=100)
    duration = models.IntegerField()

    class Meta:
        db_table = 'activities'


class Leaderboard(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    team = models.CharField(max_length=100)
    points = models.IntegerField()

    class Meta:
        db_table = 'leaderboard'


class Workout(models.Model):
    id = models.ObjectIdField(primary_key=True, editable=False)
    user = models.CharField(max_length=100)
    workout = models.CharField(max_length=100)
    reps = models.IntegerField()

    class Meta:
        db_table = 'workouts'
