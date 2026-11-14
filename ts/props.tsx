// Furkan Kaan Ünal | 2024502225
import React from 'react'
import type { ComponentProps, PropsWithChildren, ReactNode } from 'react'
import { renderToStaticMarkup as render } from 'react-dom/server'
type CardProps = { title: string; children?: ReactNode }
function CardA(props: CardProps) { return <section><h2>{props.title}</h2>{props.children}</section> }
function CardB({ title, children }: CardProps) { return <section><h2>{title}</h2>{children}</section> }
console.log('P1-A:', render(<CardA title="Schedule">Friday</CardA>))
console.log('P1-B:', render(<CardB title="Schedule">Friday</CardB>))
console.log('P2-nested:', render(<CardB title="Equivalent">text</CardB>))
console.log('P2-attribute:', render(<CardB title="Equivalent" children="text" />))
function Content({ children }: { children?: ReactNode }) { return <div>{children}</div> }
for (const [label, value] of [
 ['string', 'hello'], ['number', 17], ['element', <strong key="b">bold</strong>],
 ['several', [<em key="a">one</em>, <em key="b">two</em>]],
 ['undefined', undefined], ['null', null], ['false', false]
] as const) console.log('P3-' + label + ':', render(<Content>{value}</Content>))
type CallbackProps = { children: (value: string) => ReactNode }
function RenderCallback({ children }: CallbackProps) { return <div>{children('called')}</div> }
console.log('P3-function-called:', render(<RenderCallback>{v => <strong>{v}</strong>}</RenderCallback>))
// Deliberate error to try separately (do not uncomment during normal check):
// const rejectedFunctionChild: ReactNode = (v: string) => v
// P4: ComponentProps<'section'> gives valid section attributes.
type PanelProps = PropsWithChildren<{ title: string } & ComponentProps<'section'>>
function Panel({ title, children, ...rest }: PanelProps) { return <section {...rest} data-role="explicit"><h3>{title}</h3>{children}</section> }
function PanelReverse({ title, children, ...rest }: PanelProps) { return <section data-role="explicit" {...rest}><h3>{title}</h3>{children}</section> }
console.log('P4-explicit-last:', render(<Panel title="Desk" data-role="incoming" id="desk">A</Panel>))
console.log('P4-spread-last:', render(<PanelReverse title="Desk" data-role="incoming" id="desk">A</PanelReverse>))
function Slots({ header, footer, children }: { header: ReactNode; footer: ReactNode; children?: ReactNode }) {
 return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article> }
function Flow({ children }: PropsWithChildren) { return <article>{children}</article> }
console.log('P5-slots:', render(<Slots header={<b>Plan</b>} footer={<small>End</small>}>Body</Slots>))
console.log('P5-flow:', render(<Flow><header><b>Plan</b></header><main>Body</main><footer><small>End</small></footer></Flow>))
function Status({ label = 'Pending' }: { label?: string | null }) { return <span>{label ?? '(empty)'}</span> }
console.log('P6-undefined:', render(<Status label={undefined} />))
console.log('P6-null:', render(<Status label={null} />))
type ButtonProps = ComponentProps<'button'> & { emphasis?: boolean }
function ActionButton({ emphasis = false, children, ...rest }: ButtonProps) {
 return <button {...rest} className={emphasis ? 'primary' : 'secondary'}>{children}</button> }
console.log('P7-button:', render(<ActionButton type="button" disabled emphasis>Save</ActionButton>))
// Compiler-rejected examples to test separately:
// const invalidButton: ButtonProps = { href: '/invalid' }
// const invalidCard: CardProps = { children: 'No title' }
