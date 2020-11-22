import { atom } from "recoil"

export const playerPositionState = atom({
  key: "playerPosition", // unique ID (with respect to other atoms/selectors)
  default: { position: { x: 0, y: -15, z: 0 }, rotation: {} } // default value (aka initial value)
})

export const missilesPositionState = atom({
    key: "missilesPosition", // unique ID (with respect to other atoms/selectors)
    default: []
});

const invaders = []

for(let y = 7; y >= 3; y = y - 2) {
    for(let x = -5; x <= 5; x = x + 2) {
        invaders.push({ id: 'i-'+ x + '-' + y, initial: { x, y, z: 0 }, current: { x, y, z: 0 }, inc: 0.07 })
    }
}

export const invadersPositionState = atom({
    key: "invaders",
    default: invaders
})

export const scoreState = atom({
    key: "score",
    default: 0
})

export const missilesSentState = atom({
    key: "missilesSent",
    default: 0
})