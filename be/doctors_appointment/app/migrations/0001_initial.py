# Generated by Django 4.2.16 on 2024-11-19 08:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Appointment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("age", models.IntegerField()),
                ("gender", models.CharField(max_length=100)),
                ("mobile", models.CharField(max_length=15)),
                ("date", models.DateField()),
            ],
        ),
    ]
