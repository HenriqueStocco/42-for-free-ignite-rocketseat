/**
 * Buffers -> representaçao de uma espaço na memoria do computador, usados para transitar dados de uma maneira muito rapida. Sao armazenados ali para logo serem tratados, ou seja, enviados para algum lugar e depois removidos. o Buffer guarda os dados de forma binaria e le em forma binaria.
 */

// Enviando dado para o buffer criado
const buffer = Buffer.from('hello');

// Lendo o dado gerado pelo buffer e convertendo para json
console.log(buffer.toJSON());
