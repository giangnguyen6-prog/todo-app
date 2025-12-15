from graphene_django import DjangoObjectType

from example_app.example_model.models import ExampleModel


class ExampleModelType(DjangoObjectType):
    class Meta:
        model = ExampleModel
        fields = "__all__"
