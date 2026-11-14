// Furkan Kaan Ünal | 2024502225
// Forms 1-4: reading positional data
function examRange(scores) { return [Math.min(...scores), Math.max(...scores)] }
const [minimum, maximum] = examRange([62, 91, 74]); console.log('F1:', minimum, maximum)
const agenda = ['registration', 'workshop', 'networking', 'closing']
const [, second, ...remaining] = agenda; console.log('F2:', second, remaining)
let morningRoom = 'B101', afternoonRoom = 'B202'; [morningRoom, afternoonRoom] = [afternoonRoom, morningRoom]
console.log('F3:', morningRoom, afternoonRoom)
const [firstSeat = 'unassigned', secondSeat = 'unassigned'] = [undefined, 'A12']
console.log('F4:', firstSeat, secondSeat)
