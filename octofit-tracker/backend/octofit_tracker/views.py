from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer
from pymongo import MongoClient
from bson import ObjectId
import os


def _serialize_queryset_or_fallback(model, serializer_class, collection_name):
    """Try to fetch via Django ORM and serialize; if that fails, fallback to pymongo collection docs."""
    try:
        qs = model.objects.all()
        serializer = serializer_class(qs, many=True)
        return serializer.data
    except Exception:
        # Fallback to pymongo
        db = _get_db()
        docs = list(db[collection_name].find())
        return [_format_doc(d) for d in docs]


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
    data = _serialize_queryset_or_fallback(User, UserSerializer, 'users')
    return Response(data)


@api_view(['GET'])
def teams_list(request):
    data = _serialize_queryset_or_fallback(Team, TeamSerializer, 'teams')
    return Response(data)


@api_view(['GET'])
def activities_list(request):
    data = _serialize_queryset_or_fallback(Activity, ActivitySerializer, 'activities')
    return Response(data)


@api_view(['GET'])
def leaderboard_list(request):
    data = _serialize_queryset_or_fallback(Leaderboard, LeaderboardSerializer, 'leaderboard')
    return Response(data)


@api_view(['GET'])
def workouts_list(request):
    data = _serialize_queryset_or_fallback(Workout, WorkoutSerializer, 'workouts')
    return Response(data)


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
