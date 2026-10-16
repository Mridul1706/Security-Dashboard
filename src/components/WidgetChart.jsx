import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Bar, BarChart, XAxis, YAxis } from 'recharts'

const accountData = [
  { name: 'Connected', value: 2, color: '#6578f5' },
  { name: 'Not Connected', value: 2, color: '#dfe5ff' },
]

const riskData = [
  { name: 'Passed', value: 7253, color: '#19a866' },
  { name: 'Failed', value: 1689, color: '#dc241c' },
  { name: 'Warning', value: 681, color: '#f6c93e' },
  { name: 'Not available', value: 36, color: '#c8d0df' },
]

const barData = [
  { name: 'Critical', value: 9, color: '#a01b18' },
  { name: 'High', value: 150, color: '#d93227' },
  { name: 'Medium', value: 312, color: '#f39a30' },
  { name: 'Low', value: 999, color: '#f4cb3e' },
]

function Donut({ data, total }) {
  return (
    <div className="relative h-[120px] w-[120px] shrink-0">
      <PieChart width={120} height={120}>
        <Pie data={data} dataKey="value" innerRadius={38} outerRadius={53} stroke="none">
          {data.map((item) => <Cell key={item.name} fill={item.color} />)}
        </Pie>
      </PieChart>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <strong className="text-[15px] text-slate-800">{total}</strong>
        <span className="text-[9px] text-slate-400">Total</span>
      </div>
    </div>
  )
}

export default function WidgetChart({ type, text }) {
  if (type === 'accounts' || type === 'risk') {
    const data = type === 'accounts' ? accountData : riskData
    const total = type === 'accounts' ? 2 : 9659
    return (
      <div className="flex h-[155px] items-center gap-3">
        <Donut data={data} total={total} />
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <div className="flex items-center gap-2 text-[10px] text-slate-500" key={item.name}>
              <i className="h-2 w-2 rounded-sm" style={{ backgroundColor: item.color }} />
              <span>{item.name} ({item.value})</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'bar') {
    return (
      <div className="pt-9">
        <div className="mb-2 text-[10px] text-slate-500">
          <strong className="mr-1 text-[17px] text-slate-800">{barData.reduce((sum, item) => sum + item.value, 0)}</strong>
          Total vulnerabilities
        </div>
        <ResponsiveContainer width="100%" height={45}>
          <BarChart data={barData} layout="vertical" barCategoryGap={0}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" hide />
            <Bar dataKey="value" radius={[5, 5, 5, 5]}>
              {barData.map((item) => <Cell key={item.name} fill={item.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {barData.map((item) => (
            <span className="flex items-center gap-2 text-[10px] text-slate-500" key={item.name}>
              <i className="h-2 w-2 rounded-sm" style={{ backgroundColor: item.color }} />
              {item.name} ({item.value})
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-[155px] flex-col items-center justify-center gap-2 text-[11px] text-slate-400">
      <div className="text-4xl text-slate-300">▥</div>
      <span>{text || 'No Graph data available!'}</span>
    </div>
  )
}
