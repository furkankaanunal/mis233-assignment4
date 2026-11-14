// Furkan Kaan Ünal | 2024502225
function examRange(scores: number[]): [number, number] { return [Math.min(...scores), Math.max(...scores)] }
const [minimum, maximum] = examRange([62, 91, 74]); console.log('F1:', minimum, maximum)
const agenda: string[] = ['registration', 'workshop', 'networking', 'closing']
const [, second, ...remaining] = agenda; console.log('F2:', second, remaining)
let morningRoom: string = 'B101', afternoonRoom: string = 'B202'; [morningRoom, afternoonRoom] = [afternoonRoom, morningRoom]
console.log('F3:', morningRoom, afternoonRoom)
const seats: Array<string | undefined> = [undefined, 'A12']
const [firstSeat = 'unassigned', secondSeat = 'unassigned'] = seats
console.log('F4:', firstSeat, secondSeat)
