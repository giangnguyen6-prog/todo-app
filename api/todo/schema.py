import graphene
from graphene_django import DjangoObjectType
from .models import TodoItem

class TodoType(DjangoObjectType):
    class Meta:
        model = TodoItem


class Query(graphene.ObjectType):
    todos = graphene.List(TodoType)

    def resolve_todos(root, info):
        return TodoItem.objects.all()


class CreateTodo(graphene.Mutation):
    todo = graphene.Field(TodoType)

    class Arguments:
        title = graphene.String(required=True)

    def mutate(self, info, title):
        todo = TodoItem.objects.create(title=title)
        return CreateTodo(todo=todo)



class UpdateTodoInput(graphene.InputObjectType):
    title = graphene.String()
    completed = graphene.Boolean()


class UpdateTodo(graphene.Mutation):
    todo = graphene.Field(TodoType)

    class Arguments:
        id = graphene.ID(required=True)
        input = UpdateTodoInput(required=True)

    def mutate(self, info, id, input):
        todo = TodoItem.objects.get(id=id)

        if input.title is not None:
            todo.title = input.title

        if input.completed is not None:
            todo.completed = input.completed

        todo.save()
        return UpdateTodo(todo=todo)


class DeleteTodo(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True)

    def mutate(self, info, id):
        TodoItem.objects.filter(id=id).delete()
        return DeleteTodo(ok=True)


class Mutation(graphene.ObjectType):
    create_todo = CreateTodo.Field()
    update_todo = UpdateTodo.Field()
    delete_todo = DeleteTodo.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
