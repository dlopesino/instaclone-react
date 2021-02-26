import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { getToken } from '../utils/token';

const httpLink = createUploadLink({
    uri: 'http://localhost:4000/',
});

// creamos el link de autorizacion
const authLink = setContext((_, { headers }) => {
    const token = getToken();

    return {
        headers: {
            ...headers, // añadimos los datos que ya tiene headers
            Authorization: token ? `Bearer ${token}` : '',
        }
    }
})

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink), // añadimos el contexto al link
    // para que envíe en cada peticion el token en caso de ser necesário
});

export default client;