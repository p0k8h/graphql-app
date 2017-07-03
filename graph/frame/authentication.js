const authenticated = (fn: GraphQLFieldResolver) => (parent, args, context, info) => {
    if(contex.user) {
        return fn(parent, args, context, info);
    }
    throw new Error('User is not authenticated');
}

const getLoggedInUser = (parent, args, context, info) => context.user;
