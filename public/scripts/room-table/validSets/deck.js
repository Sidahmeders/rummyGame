const suits = ['H', 'C', 'D', 'S']
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const deck = ['Joker-1', 'Joker-2']

/**
 * suits = ['H', 'C', 'D', 'S']
 * ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
 * deck = ['Joker-1', 'Joker-2']
 * SA S2 S3 -> valid SeQuance
 * D2 D3 D4 -> valid SeQuance
 * C7 C8 C9 -> valid SeQuance
 * H6 H6 H6 -> valid Tunnela
 * S9 C9 D9 -> valid SET
 * D3 S3 H3 -> valid SET
 * C2 CA JK -> valid SeQuance (Impure)
 * D6 D5 JK -> valid SeQuance (Impure)
 */
