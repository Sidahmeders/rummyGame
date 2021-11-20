import handSetValidator from './handSetValidator.js'

export default async function updateSetStatus(nodeSetContainer) {
    const handSet = await extarctHandSet(nodeSetContainer)
    const oldSetClass = nodeSetContainer.classList[1]
    const newSetClass = handSetValidator(handSet)
    nodeSetContainer.classList.replace(oldSetClass, newSetClass)
}

async function extarctHandSet(nodeSetContainer) {
    const nodeSetCards = nodeSetContainer.childNodes
    const handSet = []

    return new Promise((reslove) => {
        setTimeout(() => {
            for (let card of nodeSetCards) {
                handSet.push(card.classList[1])
                reslove(handSet)
            }
        }, 5)
    })
}
