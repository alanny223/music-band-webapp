from django.contrib import admin
from .models import Event, EventCategory, TeamMember, BoardMember, Announcement, NewsArticle

# Register your models here
admin.site.site_header = 'Benites Ministries'
admin.site.site_title = 'Benites Ministries International'
admin.site.index_title = 'Dashboard'



admin.site.register(TeamMember)
admin.site.register(BoardMember)
admin.site.register(Announcement)
admin.site.register(NewsArticle)