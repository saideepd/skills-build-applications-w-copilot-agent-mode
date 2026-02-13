from rest_framework import serializers
from .models import User, Team, Activity, Leaderboard, Workout


def _get_obj_id(obj):
    # Attempt to return a string id for Djongo/Mongo objects
    for attr in ('id', 'pk', '_id'):
        val = getattr(obj, attr, None)
        if val:
            try:
                return str(val)
            except Exception:
                return val
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
