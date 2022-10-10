# Generated by Django 4.1.2 on 2022-10-06 09:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('articles', '0003_alter_article_content'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='article',
            options={'ordering': ['edit_at']},
        ),
        migrations.RenameField(
            model_name='article',
            old_name='edit_date',
            new_name='create_at',
        ),
        migrations.RemoveField(
            model_name='article',
            name='images',
        ),
        migrations.AddField(
            model_name='article',
            name='article_status',
            field=models.BooleanField(default=0),
        ),
        migrations.AddField(
            model_name='article',
            name='edit_at',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Images',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid5, primary_key=True, serialize=False)),
                ('images', models.ImageField(blank=True, upload_to='articles/media/images')),
                ('create_at', models.DateField(auto_now_add=True)),
                ('article', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='article_images', to='articles.article')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
