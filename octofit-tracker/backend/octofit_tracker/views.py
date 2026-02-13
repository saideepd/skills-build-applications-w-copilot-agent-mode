from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
from pymongo import MongoClient
from bson import ObjectId
import os


def _format_doc(doc):
    if not isinstance(doc, dict):
        return doc
    # Convert ObjectId to string id and remove _id
    if '_id' in doc:
        try:
            doc['id'] = str(doc['_id'])
        except Exception:
            doc['id'] = doc['_id']
        del doc['_id']
    return doc


def _get_db():
    client = MongoClient('localhost', 27017)
    return client['octofit_db']


@api_view(['GET'])
def users_list(request):
    db = _get_db()
    docs = list(db.users.find())
    docs = [_format_doc(d) for d in docs]
    return Response(docs)


@api_view(['GET'])
def teams_list(request):
    db = _get_db()
    docs = list(db.teams.find())
    docs = [_format_doc(d) for d in docs]
    return Response(docs)


@api_view(['GET'])
def activities_list(request):
    db = _get_db()
    docs = list(db.activities.find())
    docs = [_format_doc(d) for d in docs]
    return Response(docs)


@api_view(['GET'])
def leaderboard_list(request):
    db = _get_db()
    docs = list(db.leaderboard.find())
    docs = [_format_doc(d) for d in docs]
    return Response(docs)


@api_view(['GET'])
def workouts_list(request):
    db = _get_db()
    docs = list(db.workouts.find())
    docs = [_format_doc(d) for d in docs]
    return Response(docs)


@api_view(['GET'])
def api_root(request, format=None):
    base = request.build_absolute_uri('/')
    return Response({
        'users': base + 'api/users/',
        'teams': base + 'api/teams/',
        'activities': base + 'api/activities/',
        'leaderboard': base + 'api/leaderboard/',
        'workouts': base + 'api/workouts/',
    })
