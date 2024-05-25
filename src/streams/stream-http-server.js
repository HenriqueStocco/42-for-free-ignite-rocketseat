import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed)));
  }
}

// request -> Readable Stream;
// response -> Writable Stream;
// Tudo no Node e uma stream.
const server = http.createServer(async (request, response) => {
  const buffers = [];

  // O for await ira consumir todos os dados da stream de leitura e enquanto ele nao terminar, os codigos abaixos nao executam
  for await (const chunk of request) {
    buffers.push(chunk);
  }

  // Une varios pedacinhos em um grande
  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  return response.end(fullStreamContent);

  // return request.pipe(new InverseNumberStream()).pipe(response);
});

server.listen(3334);
