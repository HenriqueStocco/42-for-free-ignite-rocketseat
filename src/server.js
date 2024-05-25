import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes/Routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

/**
 * Existem 3 tipos de formas que uma aplicaçao ou frontend tem de enviar informaçoes para a nossa API.
 *
 * Query Parameters: Parametros nomeados na URL -> /users?userId=1
 * stateless, nao salva os dados.
 * Geralmente usasse Query parameter para envio de informaçoes nao sensiveis, paginaçao, filtros, coisas que modificam a response mas nao sao obrigatorios.
 *
 * Route Parameters: Parametros nomeados na Rota da URL -> /users/1
 *
 * Geralmente usadas para envios de informaçoes sensiveis e poder fazer o famoso CRUD.
 *
 * Request Body: Envio de informaçoes de formularios (geralmente)
 *
 * Geralmente para enviar formularios com dados para serem salvos no banco de dados ou para fazer um UPDATE em algum dado.
 *
 * .teste(url) -> funçao de ReGex que valida se o regex que criamos para validar query parameters, bate com a url recebida
 *
 * */

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    // executa a regex na url para retornar os dados que ele encontrou na rota
    const routeParams = request.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    request.params = params;
    request.query = query ? extractQueryParams(query) : {};
    return route.handler(request, response);
  }

  return response.writeHead(404).end('Erro');
});

server.listen(3000);
