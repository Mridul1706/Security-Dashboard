import React, { useMemo, useState } from 'react'
import {
  Avatar,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { Bell, ChevronDown, LayoutDashboard, MoreVertical, Plus, RefreshCw, Search, SlidersHorizontal } from 'lucide-react'
import AddWidgetModal from './components/AddWidgetModal'
import WidgetCard from './components/WidgetCard'
import { useDashboardStore } from './store'

export default function App() {
  const {
    categories,
    addCategory,
    addWidget,
    removeWidget,
    removeCategory,
    setWidgetVisibility,
  } = useDashboardStore()
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [range, setRange] = useState('Last 2 days')

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return categories
    return categories
      .map((category) => ({
        ...category,
        widgets: category.widgets.filter(
          (widget) =>
            widget.visible !== false &&
            widget.name.toLowerCase().includes(query),
        ),
      }))
      .filter((category) => category.widgets.length > 0 || category.name.toLowerCase().includes(query))
  }, [categories, search])

  function deleteCategory(category) {
    if (window.confirm(`Delete "${category.name}" and all of its widgets?`)) {
      removeCategory(category.id)
    }
  }

  function createCategory(name) {
    const existingCategory = categories.find((category) => category.name.toLowerCase() === name.toLowerCase())
    if (existingCategory) return existingCategory.id
    const id = `category-${Date.now()}`
    addCategory(id, name)
    return id
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="flex min-h-16 flex-wrap items-center gap-5 border-b border-slate-200 bg-white px-5 py-3 sm:px-10">
        <div className="flex items-center gap-2 font-bold text-indigo-950"><LayoutDashboard size={19} />CNAPP</div>
        <div className="hidden items-center gap-2 text-xs text-slate-400 md:flex">
          <span>Home</span><b>/</b><strong className="text-indigo-900">Dashboard V2</strong>
        </div>
        <TextField
          size="small"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search anything..."
          className="order-3 w-full sm:order-none sm:mx-auto sm:w-80"
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search size={16} /></InputAdornment> } }}
        />
        <div className="ml-auto flex items-center gap-3 text-xs text-slate-500">
          <span className="hidden sm:inline">Aditya Sharma</span>
          <ChevronDown size={15} className="hidden sm:block" />
          <Bell size={17} />
          <Avatar sx={{ width: 29, height: 29, fontSize: 10, bgcolor: '#5669dc' }}>AS</Avatar>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-10">
        <div className="mb-8 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-2 text-[10px] font-bold tracking-[0.12em] text-indigo-500">OVERVIEW</p>
            <Typography variant="h4" className="!mb-2 !text-2xl !font-bold !tracking-tight !text-indigo-950">CNAPP Dashboard</Typography>
            <p className="m-0 text-xs text-slate-500">Monitor your cloud security posture from one place.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="contained" startIcon={<Plus size={16} />} onClick={() => setIsModalOpen(true)} className="!bg-indigo-950 !text-xs hover:!bg-indigo-800">Add Widget</Button>
            <Tooltip title="Refresh dashboard"><IconButton className="!rounded-md !border !border-slate-300 !text-slate-500"><RefreshCw size={16} /></IconButton></Tooltip>
            <Tooltip title="More options"><IconButton className="!rounded-md !border !border-slate-300 !text-slate-500"><MoreVertical size={16} /></IconButton></Tooltip>
            <Button variant="outlined" endIcon={<ChevronDown size={15} />} onClick={() => setRange(range === 'Last 2 days' ? 'Last 7 days' : 'Last 2 days')} className="!text-xs !font-semibold !text-indigo-800">{range}</Button>
          </div>
        </div>

        {filteredCategories.map((category) => (
          <section className="mb-8" key={category.id}>
            <div className="mb-3 flex items-center gap-3">
              <Typography variant="h6" className="!text-sm !font-bold !text-slate-700">{category.name}</Typography>
              <span className="text-[11px] text-slate-400">
                {category.widgets.filter((widget) => widget.visible !== false).length} widgets
              </span>
              {category.isCustom && <Button color="error" size="small" onClick={() => deleteCategory(category)} className="!ml-auto !text-[10px]">Delete category</Button>}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {category.widgets
                .filter((widget) => widget.visible !== false)
                .map((widget) => (
                  <WidgetCard key={widget.id} widget={widget} categoryId={category.id} onRemove={removeWidget} />
                ))}
              <Paper
                component="button"
                onClick={() => setIsModalOpen(true)}
                className="flex min-h-[218px] items-center justify-center rounded-xl !border !border-dashed !border-slate-300 !bg-slate-50 !shadow-none hover:!border-indigo-400 hover:!bg-indigo-50"
              >
                <span className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500"><Plus size={16} />Add Widget</span>
              </Paper>
            </div>
          </section>
        ))}
        {filteredCategories.length === 0 && (
          <div className="py-16 text-center text-slate-400"><SlidersHorizontal className="mx-auto text-indigo-500" size={22} /><h2 className="mt-3 text-lg font-bold text-slate-700">No widgets found</h2><p className="text-xs">Try a different search term.</p></div>
        )}
      </main>
      {isModalOpen && (
        <AddWidgetModal
          categories={categories}
          onClose={() => setIsModalOpen(false)}
          onAdd={addWidget}
          onRemove={removeWidget}
          onSetVisibility={setWidgetVisibility}
          onAddCategory={createCategory}
        />
      )}
    </div>
  )
}
