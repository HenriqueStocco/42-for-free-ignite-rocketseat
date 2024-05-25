/**
 * Sobre o regex:
 * ReGex = Regular Expression -> Expressao regular
 *
 * // -> para dizer ao node que sera uma regex
 *
 * : -> que ira identificar a rota com uma route parameter, em string
 *
 * () -> indica uma busca dentro de outra, primeiro ele ira buscar os dois pontos e depois ele ira buscar so o ID, porque os dois pontos nao fazem parte do ID.
 *
 * [a-zA-Z] -> diz que o parametro pode ter letras de a-z minusculo e maiusculo
 *
 * + -> indica que as letras podem se repetir uma ou mais vezes
 *
 * g -> indica que e uma regex global, ela ira procurar por todos os matchs daquela operaçao, se nao tivesse, nao conseguiria captar uma url com mais de um route parameter.
 */

export function buildRoutePath(path) {
  // encontra parametros dinamicos na url
  const routeParametersRegex = /:([a-zA-Z]+)/g;

  // troca dentro o valor :id por valores que possam ir no campo
  const pathWithParams = path.replaceAll(
    routeParametersRegex,
    '(?<$1>[a-z0-9-_]+)',
  );

  // valida que a string começa com os caracteres defindos em pathWithParams
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}
