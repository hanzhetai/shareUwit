# Generated by Django 4.1.2 on 2022-10-09 14:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('articles', '0006_alter_article_id_alter_images_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='images',
            name='article',
        ),
    ]
