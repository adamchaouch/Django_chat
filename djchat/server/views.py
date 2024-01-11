from django.db.models import Count
from django.shortcuts import render
from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed, ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Category, Server
from .serializers import CategorySerializer, ServerSerializer
from .shcema import server_list_docs

# Create your views here.

class categoryListViewSet(viewsets.ViewSet):

    queryset=Category.objects.all()

    #permission_classes=[IsAuthenticated]
    @extend_schema(responses=CategorySerializer)
    def list(self, request):
        serializer=CategorySerializer(self.queryset,many=True)
        return Response(serializer.data)
class ServerListViewSet(viewsets.ViewSet):
    """
    A ViewSet for retrieving a list of Server objects with optional filtering.

    Attributes:
        queryset (QuerySet): The base queryset containing all Server objects.

    Methods:
        list(request): Retrieve a list of Server objects with optional filtering based on query parameters.

    Query Parameters:
        - category (str): Filter by category name.
        - qty (int): Limit the number of results.
        - by_user (bool): Filter by the authenticated user if True.
        - by_serverid (int): Filter by server ID.
        - by_members (bool): Annotate the result with the number of members if True.

    Raises:
        - AuthenticationFailed: If attempting to filter by user or server ID without authentication.
        - ValidationError: If the specified server ID does not exist or if there is a value error.

    Example:
        To retrieve a list of servers filtered by category "Gaming" and limited to 5 results:
        ```
        GET /servers/?category=Gaming&qty=5
        ```
    """

    queryset = Server.objects.all()
    #permission_classes=[IsAuthenticated]
    @server_list_docs
    def list(self, request):
        # Extracting query parameters
        category = request.query_params.get("category")
        qty = request.query_params.get("qty")
        by_user = request.query_params.get("by_user") == "true"
        by_serverid = request.query_params.get("by_serverid")
        by_members = request.query_params.get("by_members") == "true"

        # Check authentication for user-specific queries
        if by_user or by_serverid and not request.user.is_authenticated:
            raise AuthenticationFailed()

        # Filtering by category
        if category:
            self.queryset = self.queryset.filter(category__name=category)

        # Filtering by authenticated user
        if by_user:
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)

        # Limiting results
        if qty:
            self.queryset = self.queryset[: int(qty)]

        # Filtering by server ID
        if by_serverid:
            try:
                self.queryset = self.queryset.filter(id=by_serverid)
                if not self.queryset.exists():
                    raise ValidationError(
                        detail=f"Server with ID {by_serverid} does not exist."
                    )
            except ValueError:
                raise ValidationError(detail="Value error")

        # Annotating with the number of members
        if by_members:
            self.queryset = self.queryset.annotate(num_members=Count("member"))

        # Serializing and returning the response
        serializer = ServerSerializer(
            self.queryset, many=True, context={"num_members": by_members}
        )
        return Response(serializer.data)
