from django.db import models


class Metro(models.Model):
    id = models.Index()
    name = models.CharField(max_length=50)
    extended_name = models.CharField(max_length=125)
    population = models.IntegerField()
    notes = models.TextField()
    featured_image = models.CharField(max_length=100)


class MetroPicture(models.Model):
    id = models.Index()
    metro_id = models.ForeignKey(Metro, on_delete=models.CASCADE)
    picture_url = models.CharField(max_length=150)


class City(models.Model):
    id = models.Index()
    metro_id = models.ForeignKey(Metro, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    population = models.IntegerField()
    featured_image = models.CharField(max_length=150)


class CityPicture(models.Model):
    id = models.Index()
    city_id = models.ForeignKey(City, on_delete=models.CASCADE)
    picture_url = models.CharField(max_length=150)


class Neighborhood(models.Model):
    id = models.Index()
    metro_id = models.ForeignKey(Metro, on_delete=models.CASCADE)
    city_id = models.ForeignKey(City, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    featured_image = models.CharField(max_length=150)
    high_school_score = models.IntegerField()
    middle_school_score = models.IntegerField()
    elementary_school_score = models.IntegerField()
    address = models.CharField(max_length=150)
    minimum_value = models.IntegerField()
    maximum_value = models.IntegerField()
    min_sqft = models.IntegerField()
    max_sqft = models.IntegerField()


class NeighborhoodPicture(models.Model):
    id = models.Index()
    city_id = models.ForeignKey(Neighborhood, on_delete=models.CASCADE)
    picture_url = models.CharField(max_length=150)


