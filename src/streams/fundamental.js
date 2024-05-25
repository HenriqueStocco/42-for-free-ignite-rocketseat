/**
 * Streams -> Obter/ler pequenas partes de alguma coisa, antes mesmo de baixar/ter o arquivo por completo. Ex: Netflix, Spotify
 *
 * Processar gigas de dados, enquanto ele esta fazendo o upload do arquivo e salvando no banco de dados.
 *
 * Readable Streams -> Ler arquivos aos poucos.
 * Writable Streams -> Enviar arquivos aos poucos.
 * Transform Streams -> Transforma um dado de uma stream em outro.
 * Duplex Stream -> Pode fazer tanto a leitura quanto a escrita, menos transformar (nao e muito utilizada).
 *
 * Stream de leitura tem o objetivo de enviar dados, fornecer informaçoes.
 *
 * No node, toda porta de entrada e saida e automaticamente uma stream.
 *
 * Buffer e o modelo que o Node usa para transicionar dados entre streams
 *
 * Os 4 tipos mais comuns de streams: Readable, Writable, Transform e Duplex
 *
 * process.stdin.pipe(process.stdout);
 **/

import { Readable, Transform, Writable } from 'node:stream';

// Stream de leitura
class OneToHundredStream extends Readable {
  index = 1;
  // Retorna quais sao os dados da stream
  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

// Stream de escrita -> recebe um dado e faz alguma coisa com o dado
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    // chunk -> tudo que e enviado na stream de leitura e um chunk
    // encoding -> como a informaçao esta codificada
    // callback -> uma funçao que precisa ser chamada ao terminar de executar
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

// Stream de transformaçao -> transforma um chunk/dado em outro
// Ela obrigatoriamente precisa ler dados de algum lugar e escrever dados para outro lugar
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
