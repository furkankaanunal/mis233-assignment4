# Destructuring Field Guide

**Name:** Furkan Kaan Ünal  
**Student number:** 2024502225  
**Course:** MIS 233 — Web Based Application Programming, Fall 2026  
**Project basis:** the provided Assignment 4 starter

## Run and reproducibility

```bash
npm install
npm run all > output.txt
npm run check
node js/depth.mjs
```

This guide uses a course registration and event-room scheduling dataset. Each of the twelve forms is implemented in JavaScript and TypeScript. The supplied TypeScript configuration enables `strict` and `noUncheckedIndexedAccess`. `@ts-expect-error` is used only for the intentional failure in T5; P7 invalid examples are shown as comments.

**Verification note (14 November 2026):** The complete assignment was independently run on GitHub Actions using Node.js 22, the actual npm dependencies, React 19 and TypeScript. `npm install --no-audit --no-fund`, `npm run all`, `npm run check` and `node js/depth.mjs` all passed. The full captured output is committed in `output.txt`, including both JavaScript and TypeScript React rendering. Earlier local npm installation attempts were blocked by DNS; this was resolved by using a genuine CI runner. [Successful verification run](https://github.com/furkankaanunal/mis233-assignment4/actions/runs/43533531180).

**Bonuses claimed:** Bonus 1: LaTeX; Bonus 2: Depth; Bonus 3: Real code; Bonus 4: Git repository ([published source](https://github.com/furkankaanunal/mis233-assignment4), verified tests).

## Field guide: the twelve forms

An *array pattern* consumes iterator values in order, while an *object pattern* requests properties by name. In both cases, the right-hand expression is evaluated before individual bindings receive their values. A *rest pattern* (`...remaining`) **collects** values, whereas a *spread expression* (`...values`) **expands** them.


### Form 1: Array return by position

**Syntax:** `const [min, max] = examRange(scores)`

**Example** (`js/arrays.mjs`; reduced to the relevant lines):

```js
function examRange(scores) { return [Math.min(...scores), Math.max(...scores)] }
const [minimum, maximum] = examRange([62, 91, 74])
console.log('F1:', minimum, maximum)
```

**Output (captured from the JS run):**

```text
F1: 62 91
```

**Use it when:** A function returns two values with a fixed positional meaning.

**Watch out:** Swapping the order changes the meaning; the return should be a tuple in TypeScript.

**Plain assignments equivalent:** Read the corresponding array positions in order. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


### Form 2: Skip and collect rest

**Syntax:** `const [, second, ...remaining] = agenda`

**Example** (`js/arrays.mjs`; reduced to the relevant lines):

```js
const agenda = ['registration', 'workshop', 'networking', 'closing']
const [, second, ...remaining] = agenda
console.log('F2:', second, remaining)
```

**Output (captured from the JS run):**

```text
F2: workshop [ 'networking', 'closing' ]
```

**Use it when:** The first array element is irrelevant but the rest must be retained.

**Watch out:** The hole skips one iterator value; rest must come last. Rest is collecting, not spread.

**Plain assignments equivalent:** Read the corresponding array positions in order. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


### Form 3: Swap with assignment

**Syntax:** `[a, b] = [b, a]`

**Example** (`js/arrays.mjs`; reduced to the relevant lines):

```js
let morningRoom = 'B101', afternoonRoom = 'B202'
;[morningRoom, afternoonRoom] = [afternoonRoom, morningRoom]
console.log('F3:', morningRoom, afternoonRoom)
```

**Output (captured from the JS run):**

```text
F3: B202 B101
```

**Use it when:** Two existing variables must exchange values without a temporary name.

**Watch out:** Use assignment, not `const`; both right-hand values are evaluated before either target is assigned.

**Plain assignments equivalent:** Read the corresponding array positions in order. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


### Form 4: Array defaults

**Syntax:** `const [x = fallback] = source`

**Example** (`js/arrays.mjs`; reduced to the relevant lines):

```js
const [firstSeat = 'unassigned', secondSeat = 'unassigned'] = [undefined, 'A12']
console.log('F4:', firstSeat, secondSeat)
```

**Output (captured from the JS run):**

```text
F4: unassigned A12
```

**Use it when:** Array data might omit a position or explicitly contain `undefined`.

**Watch out:** A default does not replace `null`, `false`, or `0`.

**Plain assignments equivalent:** Read the corresponding array positions in order. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


### Form 5: Object properties by name

**Syntax:** `const { attendee, track } = registration`

**Example** (`js/objects.mjs`; reduced to the relevant lines):

```js
const registration = { attendee: 'Deniz', track: 'web', price: 250 }
const { attendee, track } = registration
console.log('F5:', attendee, track)
```

**Output (captured from the JS run):**

```text
F5: Deniz web
```

**Use it when:** A record is best understood by named fields instead of positional indexes.

**Watch out:** An absent field becomes `undefined`; destructuring `null` or `undefined` as the whole object throws.

**Plain assignments equivalent:** Look up the corresponding object properties by name. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


### Form 6: Rename a property

**Syntax:** `const { code: courseCode } = registration`

**Example** (`js/objects.mjs`; reduced to the relevant lines):

```js
const registration = { code: 'MIS233' }
const { code: courseCode } = registration
console.log('F6:', courseCode)
```

**Output (captured from the JS run):**

```text
F6: MIS233
```

**Use it when:** An object field needs a more descriptive local variable name.

**Watch out:** `code` does not become a new local variable: `courseCode` is the binding.

**Plain assignments equivalent:** Look up the corresponding object properties by name. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


### Form 7: Object default

**Syntax:** `const { currency = "TRY" } = registration`

**Example** (`js/objects.mjs`; reduced to the relevant lines):

```js
const registration = { code: 'MIS233' }
const { currency = 'TRY' } = registration
console.log('F7:', currency)
```

**Output (captured from the JS run):**

```text
F7: TRY
```

**Use it when:** Optional configuration fields need a reasonable value.

**Watch out:** The default activates only for an `undefined` property, never for `null`.

**Plain assignments equivalent:** Look up the corresponding object properties by name. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


### Form 8: Object rest

**Syntax:** `const { code, ...details } = registration`

**Example** (`js/objects.mjs`; reduced to the relevant lines):

```js
const registration = { code: 'MIS233', attendee: 'Deniz', track: 'web', seat: 'C4', price: 250 }
const { code, ...details } = registration
console.log('F8:', code, details)
```

**Output (captured from the JS run):**

```text
F8: MIS233 { attendee: 'Deniz', track: 'web', seat: 'C4', price: 250 }
```

**Use it when:** Some fields are handled separately and the remaining enumerable own properties are forwarded.

**Watch out:** The rest object is shallow: nested objects still point at the same references.

**Plain assignments equivalent:** Look up the corresponding object properties by name. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


### Form 9: Nested object/array

**Syntax:** `const { room: { floor }, slots: [firstSlot] } = timetable`

**Example** (`js/objects.mjs`; reduced to the relevant lines):

```js
const timetable = { room: { floor: 3 }, slots: ['09:00', '11:00'] }
const { room: { floor }, slots: [firstSlot] } = timetable
console.log('F9:', floor, firstSlot)
```

**Output (captured from the JS run):**

```text
F9: 3 09:00
```

**Use it when:** A response combines named object fields with ordered array data.

**Watch out:** Missing `room` or `slots` causes an exception unless you provide suitable defaults; `room` is not bound as a variable.

**Plain assignments equivalent:** Look up the corresponding object properties by name. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


### Form 10: Computed property

**Syntax:** `const { [chosenField]: selectedValue } = registration`

**Example** (`js/objects.mjs`; reduced to the relevant lines):

```js
const registration = { price: 250 }
const chosenField = 'price'
const { [chosenField]: selectedValue } = registration
console.log('F10:', selectedValue)
```

**Output (captured from the JS run):**

```text
F10: 250
```

**Use it when:** The property selected depends on a previously computed key.

**Watch out:** Square brackets evaluate the key expression; the resulting local name is `selectedValue`.

**Plain assignments equivalent:** Look up the corresponding object properties by name. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


### Form 11: Parameter patterns

**Syntax:** `function badge({ attendee = "Guest" } = {})`

**Example** (`js/params.mjs`; reduced to the relevant lines):

```js
function badge({ attendee = 'Guest', track = 'general' } = {}) { return `${attendee} / ${track}` }
console.log('F11:', badge({ attendee: 'Deniz' }), '|', badge())
```

**Output (captured from the JS run):**

```text
F11: Deniz / general | Guest / general
```

**Use it when:** Callers supply an options object with optional properties.

**Watch out:** The outer `= {}` handles an omitted argument; inner defaults handle missing fields. Neither repairs a literal null argument.

**Plain assignments equivalent:** Bind the parameters or loop entry values one by one. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


### Form 12: Loop entry patterns

**Syntax:** `for (const [key, value] of Object.entries(record))`

**Example** (`js/params.mjs`; reduced to the relevant lines):

```js
const inventory = { pens: 12, folders: 3 }
for (const [name, count] of Object.entries(inventory)) console.log('F12-object:', name, count)
```

**Output (captured from the JS run):**

```text
F12-object: pens 12
F12-object: folders 3
```

**Use it when:** A loop needs both the key and the associated value of every entry.

**Watch out:** `for...of` iterates entry arrays; `for...in` would iterate property names instead. Map iteration yields tuples too.

**Plain assignments equivalent:** Bind the parameters or loop entry values one by one. This is a convenient mental model, not a substitute for iterator side effects or default-evaluation timing.


## Five pitfalls: observed errors and explanations

### Pitfall 1 — Missing right-hand object

`const {id} = undefined` and `const {id} = null` throw before the property can be looked up. The captured Node errors are:

```text
Pitfall1: undefined TypeError Cannot destructure property 'id' of 'input' as it is undefined.
Pitfall1: null TypeError Cannot destructure property 'id' of 'input' as it is null.
```

The fix is to check the object or use an outer parameter default when omission is valid. An inner property default alone does not help.

### Pitfall 2 — Undefined is not null

`const {a = 'fallback', b = 'fallback'} = {a: undefined, b: null}` prints `Pitfall2: {"a":"fallback","b":null}`. Only `undefined` triggers the binding default, so a deliberate null stays null.

### Pitfall 3 — Assignment versus block

An existing binding can be reassigned with `({room} = {room:'new'})`; this prints `Pitfall3: new`. Removing the parentheses leads to the observed `Pitfall3-error: SyntaxError Unexpected token '='` in the tested Function constructor. The parser reads an initial `{` as a block, not an object assignment pattern.

### Pitfall 4 — No deep copy

After `const { room: shared } = original`, changing `shared.floor` also changes `original.room.floor`; the run prints `Pitfall4: 5`. Destructuring assigns the nested reference. Even `{...rest}` makes only a shallow copy.

### Pitfall 5 — Name versus position

An object `{first:'A', second:'B'}` can be written as `{second, first}` without changing values; an array `[a,b]` depends on order. The run prints `Pitfall5: A B A B`. Naming fields reduces accidental positional confusion.

## TypeScript-specific lessons T1–T5

**T1 — Rename is not a type.** In `const { building: campusBuilding } = location`, the colon means *rename*, not “building has type campusBuilding”. Put the annotation after the whole pattern: `const {building}: {building: string} = location`. `ts/types.ts` illustrates this with a typed `location`.

**T2 — Tuple and `as const`.** `[number, string]` guarantees that index 0 is a number and index 1 is a string. `[3, 'rooms'] as const` gives a readonly tuple with literal types `3` and `'rooms'`, not a broadly mutable `(string | number)[]`.

**T3 — `noUncheckedIndexedAccess`.** If `attendees: string[]` could be empty, `const [first] = attendees` is `string | undefined`. The explicit `first ?? 'no attendees'` fallback makes empty inputs safe. A fixed nonempty tuple has a known first element.

**T4 — Optional field defaults.** `language?: string` usually yields `string | undefined`. `const {language = 'tr'} = options` yields a `string`. If `display?: string | null`, `display = 'standard'` can still be `null`: the default does not remove null.

**T5 — A real type mismatch example.** `const {count: countAsText}: {count: string} = {count: 8}` causes `TS2322: Type 'number' is not assignable to type 'string'.` The marked `@ts-expect-error` line in `ts/types.ts` intentionally keeps the error visible to the compiler while allowing the project to check. The correct solution is to use `{count: number}` or `String(count)` after extracting it, not to lie about the type. The runtime still stores the number.

## React props and children: P1–P7

**P1 — One props object, two access styles.** `CardA(props)` accesses `props.title` and `props.children`; `CardB({title, children})` takes the same fields using form 5 in a function-parameter position (form 11). Both render `<section><h2>Schedule</h2>Friday</section>`. React does not pass `title` and `children` as separate positional arguments.

**P2 — Children is a prop.** `<CardB title="Equivalent">text</CardB>` and `<CardB title="Equivalent" children="text" />` have equivalent children values and render `<section><h2>Equivalent</h2>text</section>`. Do not supply both syntaxes together; nesting is clearer when the content is JSX.

**P3 — Child value categories.** Strings and numbers render as text; an element renders its markup; an array of elements renders them in sequence. `undefined`, `null`, and `false` produce no visible content. A function is **not** itself a renderable ReactNode. The JS experiment deliberately passes a bare function to a host element to observe React's handling, while `RenderCallback` invokes a render-prop function and renders its returned node. TS defines a callback separately as `(value: string) => ReactNode`; it deliberately rejects a function assigned to `ReactNode`.

**P4 — Children versus rest.** `({title, children, ...rest})` keeps two fields local and forwards remaining valid DOM props to `<section {...rest}>`. Spreading `rest` first and then setting `data-role="explicit"` produces the explicit value. Reversing that order lets the caller's `data-role="incoming"` win. Use this pattern carefully: forwarding arbitrary data to the DOM can leak unintended attributes.

**P5 — Named slots versus a single children flow.** `Slots` takes `header` and `footer` as named ReactNode props and `children` as body. This is preferable when layout positions need to be enforced independently. `Flow` uses children only, allowing the caller to control header/main/footer structure; this is simpler for highly flexible compositions but less constrained.

**P6 — Default value and null.** `function Status({label = 'Pending'})` substitutes `'Pending'` when `label` is missing or undefined. `null` bypasses the destructuring default. The sample uses `label ?? '(empty)'` inside JSX to visibly distinguish the two cases: `<span>Pending</span>` versus `<span>(empty)</span>`.

**P7 — Types and rejected props.** `children?: ReactNode` permits an optional renderable child (but not a bare function). `PropsWithChildren<{title: string}>` adds optional children. `ComponentProps<'button'>` obtains built-in HTML button props including `type`, `disabled` and event handlers; it rejects `href`. The implementation uses `ButtonProps` with `emphasis?` to demonstrate combining a custom prop with standard attributes. Deliberate P7 errors are documented as commented-out examples, leaving T5 as the only `@ts-expect-error` suppression.

### React static markup: real captured output

These HTML lines were captured from a successful GitHub Actions run of the actual JS/TS components; see `output.txt`.

```html
P1-A: <section><h2>Schedule</h2>Friday</section>
P1-B: <section><h2>Schedule</h2>Friday</section>
P2-nested: <section><h2>Equivalent</h2>text</section>
P2-attribute: <section><h2>Equivalent</h2>text</section>
P3-string: <div>hello</div>
P3-number: <div>17</div>
P3-element: <div><strong>bold</strong></div>
P3-several: <div><em>one</em><em>two</em></div>
P3-undefined: <div></div>
P3-null: <div></div>
P3-false: <div></div>
P3-function-called: <div><strong>called</strong></div>
P3-function-uninvoked: <div></div>
P4-explicit-last: <section data-role="explicit" id="desk"><h3>Desk</h3>A</section>
P4-spread-last: <section data-role="incoming" id="desk"><h3>Desk</h3>A</section>
P5-slots: <article><header><b>Plan</b></header><main>Body</main><footer><small>End</small></footer></article>
P5-flow: <article><header><b>Plan</b></header><main>Body</main><footer><small>End</small></footer></article>
P6-undefined: <span>Pending</span>
P6-null: <span>(empty)</span>
P7-button: <button type="button" disabled="" class="primary">Save</button>
```

These are the React 19 server-rendered results from the verified workflow, not guessed markup.

## JavaScript versus TypeScript (at least eight distinctions)

| Form/topic | Same JavaScript behavior | Added TS type information | Mistake TS catches |
|---|---|---|---|
| 1 | Position-based `[min,max]` | Return tuple `[number,number]` | Wrong tuple item type |
| 2 | Skip and collect rest | `string[]` item can be `undefined` | Calling `.toUpperCase()` on possibly missing item |
| 3 | Swap targets | Bindings must be assignable types | Swapping `string` and `number` variables |
| 4 | Defaults only on undefined | `string \| undefined` source | Treating `null` as `string` |
| 5 | Extract properties by name | `Registration` interface/type | Accessing a property absent from type |
| 6 | Renaming with colon | Annotation goes after whole pattern | Accidentally treating rename as a type |
| 7 | Property fallback | Optional `currency?: string` | Using optional result as always defined |
| 8 | Collect remaining properties | Inferred `Omit`-like shape | Reading extracted `code` from `details` |
| 9 | Nested fields | Shape for `room` and tuple `slots` | Reading absent nested field |
| 10 | Computed key evaluated | Key constrained to `keyof Registration` | Unknown key used on typed object |
| 11 | Defaulted options | `BadgeOptions` parameter annotation | Invalid option value type |
| 12 | Iterate entry pairs | `Map<string,number>` | Treating a Map value as a string |
| P7 | Children still a prop | `ReactNode`, `PropsWithChildren`, `ComponentProps` | Passing `href` to button or missing title |

Some errors above are representative type mistakes rather than compiler diagnostics captured from this environment.

## Bonus 1: LaTeX

The directory `latex/` contains the full guide as `Destructuring_Field_Guide.tex` and a generated PDF. The PDF is typeset from the same README content, with headings, a linked table of contents, real tables and syntax-preserving code listings. Build command:

```bash
cd latex
pdflatex -interaction=nonstopmode -halt-on-error Destructuring_Field_Guide.tex
pdflatex -interaction=nonstopmode -halt-on-error Destructuring_Field_Guide.tex
```

## Bonus 2: Depth

The runnable extra experiments in `js/depth.mjs` cover: strings (D1), Set iteration with duplicate removal (D2), generator/iterator consumption (D3), lazy default evaluation (D4), using an earlier binding inside a later default (D5), destructuring an error in catch (D6), assignment to object properties (D7), Map entry iterators (D8), and shallow object rest (D9). Run `node js/depth.mjs`.

```text
D1-string: M I
D2-set: web [ 'finance' ]
D3-generator: A1 C3
D4-lazy-default: given computed 1
D5-earlier-binding: 3 6
D6-catch: registration closed
D7-target: { x: 5, y: 9 }
D8-map-entry: East 4
D9-shallow-rest: 7 9
```

**Why these happen:** an array pattern asks for an iterator, not necessarily an Array. A Set iterates its unique insertion-order values, while a generator produces items lazily. Skipped iterator positions can still advance an iterator. Default expressions execute only for `undefined`; consequently D4 calls `fallback()` once rather than twice. A later default can read an earlier initialized variable (`doubled = base * 2`), but not a later variable still inside its temporal dead zone. D6 destructures the thrown Error object. D7 shows destructuring assignment can target properties. D9 proves an object rest copy is shallow.

**Readability tradeoff:** `const {student:{profile:{address:{city}}}} = record` is compact but fragile when any intermediate value is absent. Extracting `const city = record.student?.profile?.address?.city ?? 'unknown'` explicitly handles incomplete data and makes the fallback visible. For short stable record shapes, destructuring remains clearer.

**Type-level extension:** `ts/types.ts` defines `First<T>` and `Tail<T>` with conditional types and `infer` to extract tuple element types. This is about types at compilation, not runtime destructuring.

## Bonus 3: Real code

Five source-grounded cases follow, using the **original supplied starter** as real code written by someone else. Its line numbers are stable because an untouched copy of the starter was provided with the assignment. The external p-limit example is a sixth, additional case (upstream line numbers are revision-dependent).

| Case | Original source, exact line | Form | Equivalent without destructuring | Assessment |
|---|---|---|---|---|
| 1 | Starter `js/arrays.mjs:8` | 1 `[lowest, highest]` | `const pair=minMax([4,9,2]); const lowest=pair[0]; const highest=pair[1]` | Clearly expresses a two-value return. |
| 2 | Starter `js/objects.mjs:6` | 5 `{title,status}` | `const title=task.title; const status=task.status` | Short and readable because both properties are used. |
| 3 | Starter `js/params.mjs:5` | 11 `{title,status='todo'}={}` | `function createTask(options={}) {const title=options.title; const status=options.status===undefined?'todo':options.status; ...}` | Makes the public configuration compact; nested defaults require explanation. |
| 4 | Starter `js/props.jsx:10` | 5 + 11 `CardB({title,children})` | `function CardB(props){return <section><h2>{props.title}</h2>{props.children}</section>}` | React-specific example: `title` is a named attribute prop, `children` is the nested tag content, but both are properties of the same object. |
| 5 | Starter `ts/props.tsx:9` | 5 + 11 `Card({title,children}:CardProps)` | `function Card(props: CardProps){return <section><h2>{props.title}</h2>{props.children}</section>}` | Shows that TypeScript annotates the **entire parameter pattern**, not each renamed field. |
| 6 | [`p-limit/index.js:7`](https://github.com/sindresorhus/p-limit/blob/main/index.js#L7), options branch | 5 + 7 `({concurrency,rejectOnClear=false}=concurrency)` | `const options=concurrency; concurrency=options.concurrency; rejectOnClear=options.rejectOnClear===undefined?false:options.rejectOnClear` | **Readability concern:** the expression reassigns `concurrency` from an object to a number while destructuring it. A separate `options` variable would communicate intent more directly. The linked upstream source was checked on 14 November 2026. |

A strong improvement would be to add cases from the Assignment 3 Task Manager and a locally installed library. Those sources were not supplied in this upload, so their exact source lines have not been invented.

## Bonus 4: Git repository

Public repository: **https://github.com/furkankaanunal/mis233-assignment4**. The project source, `package-lock.json`, captured execution output, and strict TypeScript verification workflow are published. See the [successful GitHub Actions run](https://github.com/furkankaanunal/mis233-assignment4/actions/runs/43533531180). The `.gitignore` excludes `node_modules`.

A local six-commit development history is packaged in `assignment4-history.bundle` in the Moodle ZIP. The GitHub repository also contains a visible incremental commit history. Commits produced in one session were not falsely backdated to imitate work over several days. Instructor access follows the course's Moodle instructions.

## My own log

This section records verifiable tool-run outcomes, not invented personal study experiences. Add your own wrong guesses or reflections before submitting.

1. The dependency install with `npm ci --offline --no-audit --no-fund` stopped with `ENOTCACHED` because the requested `undici-types-6.21.0.tgz` was not cached. **Learning:** lockfiles do not make an offline install possible without cached packages.
2. An online `npm ci --no-audit --no-fund` attempt timed out; `curl -I https://registry.npmjs.org/react` returned `curl: (6) Could not resolve host: registry.npmjs.org`. **Learning:** a partial `node_modules` directory does not mean the dependencies are installed.
3. The JS null/undefined test produced two different TypeError descriptions. **Learning:** both fail as whole-object destructuring inputs; a property-level fallback cannot help.
4. The deliberately malformed assignment raised `SyntaxError Unexpected token '='`; wrapping the expression in parentheses succeeded. **Learning:** the grammar distinguishes statement blocks from destructuring assignments.
5. The shallow reference experiment produced `Pitfall4: 5` after changing `shared.floor`. **Learning:** extracting nested objects does not deep-clone them.
6. The lazy default experiment produced a call counter of `1` rather than `2`. **Learning:** the fallback function executes only for the element that was undefined.
7. `D9-shallow-rest: 7 9` showed the rest object's nested property change also affected the source. **Learning:** object rest is not a recursive copy.
8. `tsc --noEmit` initially reported `TS17008: JSX element 'article' has no corresponding closing tag` in `ts/props.tsx`; I added `</article>`, then syntax parsing succeeded. **Learning:** JSX tags must be balanced before meaningful type-checking can proceed.
9. `tsc -p tsconfig.offline.json` passed with no diagnostics for non-React TypeScript files. **Learning:** a targeted compile is helpful but does not replace a complete project check.
10. On GitHub Actions, the real `npm install`, `npm run all`, `npm run check`, and depth experiment completed successfully. **Learning:** a reproducible clean runner can validate the complete project even when the original machine has DNS restrictions.

### References

- ECMA-262, destructuring binding and assignment patterns: https://tc39.es/ecma262/
- MDN, destructuring assignment: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring
- TypeScript handbook, object types and tuples: https://www.typescriptlang.org/docs/handbook/2/objects.html
- React documentation, passing props: https://react.dev/learn/passing-props-to-a-component
- Third-party example source: https://github.com/sindresorhus/p-limit