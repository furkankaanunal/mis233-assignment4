// Furkan Kaan Ünal | 2024502225
// Forms 11-12: parameters and loops
function badge({ attendee = 'Guest', track = 'general' } = {}) { return `${attendee} / ${track}` }
console.log('F11:', badge({ attendee: 'Deniz' }), '|', badge())
function pointLabel([x, y] = [0, 0]) { return `${x}:${y}` }
console.log('F11-array:', pointLabel([4, 9]), pointLabel())
const inventory = { pens: 12, folders: 3 }
for (const [name, count] of Object.entries(inventory)) console.log('F12-object:', name, count)
const booths = new Map([['North', 2], ['South', 4]])
for (const [building, number] of booths) console.log('F12-map:', building, number)
