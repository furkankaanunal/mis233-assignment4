// Furkan Kaan Ünal | 2024502225
// Five reproducible pitfalls; errors are caught to preserve the run
for (const input of [undefined, null]) { try { const { id } = input; console.log(id) }
catch (error) { console.log('Pitfall1:', String(input), error.name, error.message) } }
const { a = 'fallback', b = 'fallback' } = { a: undefined, b: null }
console.log('Pitfall2:', JSON.stringify({ a, b }))
let room = 'old'; ({ room } = { room: 'new' }); console.log('Pitfall3:', room)
try { new Function('let room; { room } = { room: "new" };')() }
catch (error) { console.log('Pitfall3-error:', error.name, error.message) }
const original = { room: { floor: 1 } }; const { room: shared } = original; shared.floor = 5
console.log('Pitfall4:', original.room.floor)
const { second, first } = { first: 'A', second: 'B' }; const [arrayFirst, arraySecond] = ['A', 'B']
console.log('Pitfall5:', first, second, arrayFirst, arraySecond)
