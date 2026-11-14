// Furkan Kaan Ünal | 2024502225
import React from 'react'
import { renderToStaticMarkup as render } from 'react-dom/server'
function CardA(props) { return <section><h2>{props.title}</h2>{props.children}</section> }
function CardB({ title, children }) { return <section><h2>{title}</h2>{children}</section> }
console.log('P1-A:', render(<CardA title="Schedule">Friday</CardA>))
console.log('P1-B:', render(<CardB title="Schedule">Friday</CardB>))
console.log('P2-nested:', render(<CardB title="Equivalent">text</CardB>))
console.log('P2-attribute:', render(<CardB title="Equivalent" children="text" />))
function Content({ children }) { return <div>{children}</div> }
const variants = [['string', 'hello'], ['number', 17], ['element', <strong>bold</strong>],
 ['several', [<em key="a">one</em>, <em key="b">two</em>]], ['undefined', undefined],
 ['null', null], ['false', false]]
for (const [label, value] of variants) console.log('P3-' + label + ':', render(<Content>{value}</Content>))
const functionChild = (value) => <strong>{value}</strong>
function RenderCallback({ children }) { return <div>{children('called')}</div> }
console.log('P3-function-called:', render(<RenderCallback>{functionChild}</RenderCallback>))
console.log('P3-function-uninvoked:', render(<Content>{functionChild}</Content>))
function Panel({ title, children, ...rest }) { return <section {...rest} data-role="explicit"><h3>{title}</h3>{children}</section> }
function PanelReverse({ title, children, ...rest }) { return <section data-role="explicit" {...rest}><h3>{title}</h3>{children}</section> }
console.log('P4-explicit-last:', render(<Panel title="Desk" data-role="incoming" id="desk">A</Panel>))
console.log('P4-spread-last:', render(<PanelReverse title="Desk" data-role="incoming" id="desk">A</PanelReverse>))
function Slots({ header, footer, children }) { return <article><header>{header}</header><main>{children}</main><footer>{footer}</footer></article> }
function Flow({ children }) { return <article>{children}</article> }
console.log('P5-slots:', render(<Slots header={<b>Plan</b>} footer={<small>End</small>}>Body</Slots>))
console.log('P5-flow:', render(<Flow><header><b>Plan</b></header><main>Body</main><footer><small>End</small></footer></Flow>))
function Status({ label = 'Pending' }) { return <span>{label ?? '(empty)'}</span> }
console.log('P6-undefined:', render(<Status label={undefined} />))
console.log('P6-null:', render(<Status label={null} />))
