# Generated by Django 4.0.3 on 2022-06-02 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='location',
            name='picture_url',
            field=models.URLField(default='https://media.discordapp.net/attachments/978448643956801637/982062871758401586/unknown.png?width=920&height=920'),
        ),
    ]
