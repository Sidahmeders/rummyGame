export default function getTargetCard(oldCardsList, newCardsList) {
    for (let oldCard of oldCardsList) {
        if (newCardsList.indexOf(oldCard) === -1) {
            return oldCard
        }
    }
    return undefined
}
