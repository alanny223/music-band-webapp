from django.contrib import admin
from .models import Event, EventCategory, TeamMember, BoardMember


# Register your models here
admin.site.site_header = 'Benites Ministries'
admin.site.site_title = 'Benites Ministries International'
admin.site.index_title = 'Dashboard'


admin.site.register(EventCategory)
admin.site.register(Event)
admin.site.register(TeamMember)
admin.site.register(BoardMember)
