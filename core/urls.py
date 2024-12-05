# urls.py
from django.urls import path
from . import views

urlpatterns = [

    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('api/filter-team-members/', views.filter_team_members, name='filter_team_members'),
    path('service/', views.service, name='service'),
    path('event/', views.event_list, name='event_list'),
    path('event/<int:pk>/', views.event_detail, name='event_detail'),
    path('announcement/create/', views.event_create, name='event_create'),
    path('announcement/<int:pk>/update/', views.event_update, name='event_update'),
    path('announcement/<int:pk>/delete/', views.event_delete, name='event_delete'),

]
