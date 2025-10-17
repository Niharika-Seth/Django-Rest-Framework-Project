from django.urls import path
from .views import TodoListCreateView, TodoDetailView

urlpatterns = [
    path('', TodoListCreateView.as_view()),
    path('<int:pk>/', TodoDetailView.as_view()),
]
