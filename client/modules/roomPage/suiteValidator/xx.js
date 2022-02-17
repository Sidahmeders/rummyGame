export function isValidTunnela(cards) {
  let prevoiusCard
  let isValidTunnela = true

  for (let currentCard of cards) {
    if (prevoiusCard && currentCard !== prevoiusCard) {
      isValidTunnela = false
    }
    prevoiusCard = currentCard
  }

  return isValidTunnela ? 'setClassName.validTunnela' : false
}

export const setClassName = {
  invalid: 'invalid',
  pureSequance: 'pure-sequance',
  validTunnela: 'tunnela',
  validSet: 'valid-set',
}
