from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


def _get_obj_id(obj):
    # Attempt to return a string id for Djongo/Mongo objects
    # Common attribute accessors
    # 1) obj.__dict__ may contain '_id' or 'id' when using Djongo/pymongo
    try:
        d = getattr(obj, '__dict__', None)
        if isinstance(d, dict):
            for key in ('_id', 'id'):
                if key in d and d[key] is not None:
                    try:
                        return str(d[key])
                    except Exception:
                        return d[key]
    except Exception:
        pass

    # 2) common attributes on model instances
    for attr in ('id', 'pk', '_id'):
        try:
            val = getattr(obj, attr, None)
        except Exception:
            val = None
        if val is not None:
            try:
                return str(val)
            except Exception:
                return val

    # 3) If it's a mapping-like object
    try:
        if isinstance(obj, dict):
            for key in ('id', '_id'):
                if key in obj and obj[key] is not None:
                    try:
                        return str(obj[key])
                    except Exception:
                        return obj[key]
    except Exception:
        pass

    return None


class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = '__all__'

    def get_id(self, obj):
        return _get_obj_id(obj)


class TeamSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Team
        fields = '__all__'

    def get_id(self, obj):
        return _get_obj_id(obj)


class ActivitySerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = '__all__'

    def get_id(self, obj):
        return _get_obj_id(obj)


class LeaderboardSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Leaderboard
        fields = '__all__'

    def get_id(self, obj):
        return _get_obj_id(obj)


class WorkoutSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField()

    class Meta:
        model = Workout
        fields = '__all__'

    def get_id(self, obj):
        return _get_obj_id(obj)
