from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin

from accounts.forms import UserCreationForm, UserChangeForm
from accounts.models import User


@admin.register(User)
class UserAdmin(DjangoUserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User

    fieldsets = (
        (None, {'fields': ('email', 'password', 'grouprole')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'phone','image')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
                                        'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('id','email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
