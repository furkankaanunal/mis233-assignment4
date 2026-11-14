// Furkan Kaan Ünal | 2024502225
// Forms 5-10: named data
const registration = { code: 'MIS233', attendee: 'Deniz', track: 'web', seat: 'C4', price: 250 }
const { attendee, track } = registration; console.log('F5:', attendee, track)
const { code: courseCode } = registration; console.log('F6:', courseCode)
const { currency = 'TRY' } = registration; console.log('F7:', currency)
const { code, ...details } = registration; console.log('F8:', code, details)
const timetable = { room: { floor: 3, building: 'North' }, slots: ['09:00', '11:00'] }
const { room: { floor }, slots: [firstSlot] } = timetable; console.log('F9:', floor, firstSlot)
const chosenField = 'price'; const { [chosenField]: selectedValue } = registration
console.log('F10:', selectedValue)
