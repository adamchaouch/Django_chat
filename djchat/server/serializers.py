from rest_framework import serializers

from .models import Channel, Server


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class ServerSerializer(serializers.ModelSerializer):
    num_members = serializers.SerializerMethodField()

    # channel_server=channelSerializer()
    class Meta:
        model = Server
        exclude = ("member",)

    def get_num_members(self, obj):
        if hasattr(obj, "num_members"):
            return obj.num_members
        return None

    def to_representation(self, instance):
        data = super().to_representation(instance)

        print(data.get("num_members"), "num member")
        # Check if 'num_members' key exists in the data dictionary before accessing it
        if not data.get("num_members"):  # Using data.get() to avoid KeyError
            data.pop("num_members", None)

        return data
