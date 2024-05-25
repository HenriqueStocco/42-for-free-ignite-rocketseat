/**
 * Middleware -> E uma funçao que ira interceptar a nossa requesiçao, e ela ira tratar e/ou transformar nossa requisiçao.
 * No caso ela recebe os dados em streams e converte os dados da requisiçao em formato JSON e devolve em JSON.
 */

export async function json(request, response) {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    request.body = null;
  }

  response.setHeader('Content-type', 'application/json');
}
