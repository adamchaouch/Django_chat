import os

from django.core.exceptions import ValidationError
from PIL import Image


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as img:
            if img.width > 70 or img.height > 70:
                raise ValidationError(
                    f"The maximum allowed dimensions for the image are 70x70. size image uploaded is  {img.size}"
                )


def validate_image_extension(value):
    ext = os.path.splitext(value.name)[1]
    validExtensions = [".jpg", ".jpeg", ".png", ".gif"]
    if not ext.lower() in validExtensions:
        ValidationError("Unsupported file extension")
