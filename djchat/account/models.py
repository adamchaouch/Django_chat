from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class Account(AbstractUser):
    # Add a related_name for the groups field
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="account_groups",
        blank=True,
        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
    )

    # Add a related_name for the user_permissions field
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="account_user_permissions",
        blank=True,
        help_text="Specific permissions for this user.",
    )
