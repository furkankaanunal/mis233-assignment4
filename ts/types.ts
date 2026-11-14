// Furkan Kaan Ünal | 2024502225
// T1: the colon in a pattern renames the variable, it does not annotate its type.
const campusLocation: { building: string; floor: number } = { building: 'North', floor: 3 }
const { building: campusBuilding } = campusLocation; console.log('T1:', campusBuilding)
// T2: a tuple preserves individual position types; as const freezes positions/types.
function ticket(): [number, string] { return [42, 'confirmed'] }
const [ticketId, ticketStatus] = ticket()
const immutable = [3, 'rooms'] as const; const [roomCount, unit] = immutable
console.log('T2:', ticketId, ticketStatus, roomCount, unit)
// T3: regular arrays can be empty with noUncheckedIndexedAccess.
const attendees: string[] = []
const [possiblyMissing] = attendees
console.log('T3:', possiblyMissing ?? 'no attendees')
// T4: default removes undefined from the resulting variable, but not null.
type Options = { language?: string; display?: string | null }
const options: Options = { display: null }
const { language = 'tr', display = 'standard' } = options
console.log('T4:', language, display)
// T5: expected compile-time failure: the property is number, not string.
const result: { count: number } = { count: 8 }
// @ts-expect-error Type 'number' is not assignable to type 'string'.
const { count: countAsText }: { count: string } = result
console.log('T5:', countAsText, typeof countAsText)
// Bonus: types can also be destructured with infer.
type First<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never
type Tail<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : never
const head: First<[number, string]> = 7
const tail: Tail<[number, string, boolean]> = ['ready', true]
console.log('Bonus-types:', head, tail)
