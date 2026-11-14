// Furkan Kaan Ünal | 2024502225
// Bonus 2: executable experiments, not merely a list of features
const [letterOne, letterTwo] = 'MIS'; console.log('D1-string:', letterOne, letterTwo)
const [setFirst, ...setOthers] = new Set(['web', 'finance', 'web']); console.log('D2-set:', setFirst, setOthers)
function* slotGenerator() { yield 'A1'; yield 'B2'; yield 'C3' }
const [generatorFirst, , generatorThird] = slotGenerator()
console.log('D3-generator:', generatorFirst, generatorThird)
let calls = 0; function fallback() { calls += 1; return 'computed' }
const [provided = fallback(), missing = fallback()] = ['given', undefined]
console.log('D4-lazy-default:', provided, missing, calls)
const [base = 3, doubled = base * 2] = []
console.log('D5-earlier-binding:', base, doubled)
try { throw new Error('registration closed') } catch ({ message }) { console.log('D6-catch:', message) }
const desk = { x: 0, y: 0 }; [desk.x, desk.y] = [5, 9]; console.log('D7-target:', desk)
const [mapKey, mapValue] = new Map([['East', 4]]).entries().next().value
console.log('D8-map-entry:', mapKey, mapValue)
const original = { nested: { score: 1 }, other: 9 }; const { other, ...rest } = original
rest.nested.score = 7; console.log('D9-shallow-rest:', original.nested.score, other)
