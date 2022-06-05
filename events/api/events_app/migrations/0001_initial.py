# Generated by Django 4.0.3 on 2022-06-02 19:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='State',
            fields=[
                ('id', models.PositiveIntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=40)),
                ('abbreviation', models.CharField(max_length=2, unique=True)),
            ],
            options={
                'ordering': ('abbreviation',),
            },
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=200)),
                ('picture_url', models.URLField(null=True)),
                ('state', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='+', to='events_app.state')),
            ],
            options={
                'ordering': ('name',),
            },
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('starts', models.DateTimeField()),
                ('ends', models.DateTimeField()),
                ('description', models.TextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('location', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to='events_app.location')),
            ],
            options={
                'ordering': ('starts', 'name'),
            },
        ),
    ]