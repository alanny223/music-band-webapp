from django.db import models
from django.urls import reverse


class EventCategory(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7, help_text="HEX color code (e.g. #FF0000)")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Event Categories"


class Event(models.Model):
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='event_images/', null=True, blank=True)  # Make the field nullable
    description = models.TextField(blank=True)
    start_datetime = models.DateTimeField()
    end_datetime = models.DateTimeField()
    category = models.ForeignKey(EventCategory, on_delete=models.CASCADE)
    location = models.CharField(max_length=200, null=True, blank=True)
    url = models.URLField(blank=True)

    def __str__(self):
        return self.title

    @property
    def image_url(self):
        return self.image.url if self.image else ''

    def get_color(self):
        return self.category.color

    def get_absolute_url(self):
        return reverse('event_detail', args=[str(self.id)])


class TeamMember(models.Model):
    CATEGORY_CHOICES = [
        ('pianists', 'Pianists'),
        ('singers', 'Singers'),
        ('bassists', 'Bassists'),
        ('guitarist', 'Guitarist'),
        ('drummer', 'Drummer'),
    ]

    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    bio = models.TextField()
    specialty = models.CharField(max_length=200)
    image = models.ImageField(upload_to='media/team/')

    # Social media links
    facebook = models.URLField(blank=True, null=True)
    instagram = models.URLField(blank=True, null=True)
    tiktok = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - {self.role}"

    def to_dict(self):
        """Convert model instance to dictionary for JSON serialization"""
        return {
            'name': self.name,
            'role': self.role,
            'category': self.category,
            'bio': self.bio,
            'specialty': self.specialty,
            'image': self.image.url if self.image else '',
            'social': {
                'facebook': self.facebook or '#',
                'instagram': self.instagram or '#',
                'tiktok': self.tiktok or '#',
            }
        }


class BoardMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    image = models.ImageField(upload_to='leadership/')
    bio = models.TextField()
    linkedin = models.URLField(blank=True)
    twitter = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    facebook = models.URLField(blank=True)
    tiktok = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.name} - {self.role}"

    def to_dict(self):
        """Convert model instance to dictionary"""
        return {
            'name': self.name,
            'role': self.role,
            'image_url': self.image.url if self.image else '',
            'bio': self.bio,
            'linkedin': self.linkedin,
            'twitter': self.twitter,
            'instagram': self.instagram,
            'facebook': self.facebook,
            'tiktok': self.tiktok,
        }
