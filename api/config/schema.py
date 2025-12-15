import graphene
from example_app.schema import Query as ExampleAppQuery
from example_app.schema import Mutation as ExampleAppMutation


class Query(
    ExampleAppQuery,
):
    pass


class Mutation(
    ExampleAppMutation,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
