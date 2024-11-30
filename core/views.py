from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import user_passes_test
from .forms import EventForm
from .models import TeamMember, BoardMember, EventCategory, Event
from django.http import JsonResponse
from django.core.serializers.json import DjangoJSONEncoder
import json


def home(request):
    return render(request, 'home.html')


def about(request):
    """Main view for the about page that includes both team and leadership sections"""
    try:
        # Get team members data
        team_members = TeamMember.objects.all()
        serialized_team = json.dumps([member.to_dict() for member in team_members], cls=DjangoJSONEncoder)
        categories = ['all'] + list(TeamMember.objects.values_list('category', flat=True).distinct())

        # Get board members data
        board_members = BoardMember.objects.all()
        serialized_board = json.dumps([member.to_dict() for member in board_members], cls=DjangoJSONEncoder)

        context = {
            'team_members': serialized_team,
            'categories': categories,
            'board_members': serialized_board,
        }
        return render(request, 'about.html', context)
    except Exception as e:
        # Handle any potential errors
        return render(request, 'about.html', {'error': str(e)})


def filter_team_members(request):
    """AJAX view to filter team members by category"""
    try:
        category = request.GET.get('category', 'all')

        if category == 'all':
            members = TeamMember.objects.all()
        else:
            members = TeamMember.objects.filter(category=category)

        members_data = [{
            'name': member.name,
            'role': member.role,
            'category': member.category,
            'bio': member.bio,
            'specialty': member.specialty,
            'image': member.image.url if member.image else '',
            'social': {
                'facebook': member.facebook,
                'instagram': member.instagram,
                'tiktok': member.tiktok,
            }
        } for member in members]

        return JsonResponse({'members': members_data})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


def service(request):
    return render(request, 'service.html')


def event_list(request):
    """Display the event calendar (monthly/weekly/daily view)"""
    events = Event.objects.all().order_by('start_datetime')
    categories = EventCategory.objects.all()
    return render(request, 'event.html', {'events': events, 'categories': categories})


def event_detail(request, pk):
    event = get_object_or_404(Event, pk=pk)
    return render(request, 'event_detail.html', {'event': event})


def is_superuser(user):
    return user.is_superuser


@user_passes_test(is_superuser)
def event_create(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('event_list')
    else:
        form = EventForm()
    return render(request, 'events/event_form.html', {'form': form})


@user_passes_test(is_superuser)
def event_update(request, pk):
    event = Event.objects.get(pk=pk)
    if request.method == 'POST':
        form = EventForm(request.POST, instance=event)
        if form.is_valid():
            form.save()
            return redirect('event_list')
    else:
        form = EventForm(instance=event)
    return render(request, 'events/event_form.html', {'form': form})


@user_passes_test(is_superuser)
def event_delete(request, pk):
    event = Event.objects.get(pk=pk)
    if request.method == 'POST':
        event.delete()
        return redirect('event_list')
    return render(request, 'events/event_confirm_delete.html', {'event': event})

