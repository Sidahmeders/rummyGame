/**
 * for each card in cards
 * split cards to Suit and Rank
 * check if Ith Rank+1 is Equal to Ith+1 Rank for a set of three cards
 * && Ith Suit equal Ith+1 to n
 */
const validSeQuance = 'Valid SeQuance'
const ValidSeQuanceImpure = 'Impure Valid SeQuance'
const validTunnela = 'Valid Tunnela'
const validSET = 'Valid SET'

function isValidSet(cards) {
    let isValidRank = true
    let previousRank
    let suitSet = new Set()

    for (let card of cards) {
        let [currentSuit, currentRank] = [card[0], card[1]]
        if (currentRank === 'A') currentRank = '1'

        if (previousRank && previousRank != currentRank) isValidRank = false
        suitSet.add(currentSuit)

        previousRank = currentRank
    }

    return isValidRank && suitSet.size === 3
}

console.log(isValidSet())

function isValidSequence(cards) {
    let isValidSuit = true,
        isValidRank = true

    let previousRank, previousSuit

    for (let card of cards) {
        let [currentSuit, currentRank] = [card[0], card[1]]
        if (currentRank === 'A') currentRank = '1'
        if (previousSuit && previousRank) {
            if (previousRank != currentRank - 1) isValidRank = false
            if (previousSuit != currentSuit) isValidSuit = false
        }
        previousSuit = currentSuit
        previousRank = currentRank
    }

    return isValidSuit && isValidRank
}

function isValidTunnela(cards) {}

/**
 * suits = ['H', 'C', 'D', 'S']
 * ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
 * deck = ['Joker-1', 'Joker-2']
 *
 * SA S2 S3 -> valid SeQuance
 * D2 D3 D4 -> valid SeQuance
 * C7 C8 C9 -> valid SeQuance
 * H6 H6 H6 -> valid Tunnela
 * S9 C9 D9 -> valid SET
 * D3 S3 H3 -> valid SET
 *
 * C2 CA JK -> valid SeQuance (Impure)
 * D6 D5 JK -> valid SeQuance (Impure)
 */
