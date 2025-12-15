import graphene
from example_app.example_model.types import ExampleModelType
from example_app.example_model.models import ExampleModel


class Query(graphene.ObjectType):
    example_model = graphene.Field(ExampleModelType, id=graphene.Int(required=True))

    def resolve_example_model(self, info, id):
        try:
            return ExampleModel.objects.get(pk=id)
        except ExampleModel.DoesNotExist:
            return None


class CreateNewExampleModel(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String()

    example_model = graphene.Field(ExampleModelType)

    def mutate(self, info, name, description=None):
        example_model = ExampleModel(name=name, description=description)
        example_model.save()
        return CreateNewExampleModel(example_model=example_model)


class Mutation(graphene.ObjectType):
    create_example_model = CreateNewExampleModel.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
