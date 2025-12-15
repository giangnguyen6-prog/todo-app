import graphene
from example_app.example_model.schema import Query as ExampleModelQuery
from example_app.example_model.schema import Mutation as ExampleModelMutation


class Query(
    ExampleModelQuery,
):
    pass


class Mutation(
    ExampleModelMutation,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
