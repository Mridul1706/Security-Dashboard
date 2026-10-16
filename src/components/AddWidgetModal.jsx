import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material'

const tabs = ['CSPM', 'CWPP', 'Registry', 'Tickets']

export default function AddWidgetModal({ categories, onClose, onAdd, onRemove, onAddCategory }) {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('cspm')
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [selectedWidgets, setSelectedWidgets] = useState([])

  const category = categories.find((item) => item.id === selectedCategory)
  const pendingWidgets = category?.widgets || []

  useEffect(() => {
    setSelectedWidgets(pendingWidgets.map((widget) => widget.id))
  }, [selectedCategory, categories])

  function isWidgetSelected(widgetId) {
    return selectedWidgets.includes(widgetId)
  }

  function toggleWidget(widgetId) {
    setSelectedWidgets((current) =>
      current.includes(widgetId)
        ? current.filter((id) => id !== widgetId)
        : [...current, widgetId],
    )
  }

  function submit(event) {
    event.preventDefault()
    if (!name.trim() || !selectedCategory) return
    onAdd(selectedCategory, {
      id: `${selectedCategory}-${Date.now()}`,
      name: name.trim(),
      type: 'empty',
      text: text.trim() || 'Custom dashboard widget',
    })
    setName('')
    setText('')
  }

  function createCategory(event) {
    event.preventDefault()
    const trimmedName = categoryName.trim()
    if (!trimmedName || categories.length >= 5) return
    const newCategoryId = onAddCategory(trimmedName)
    setSelectedCategory(newCategoryId)
    setCategoryName('')
  }

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="!bg-indigo-950 !px-6 !py-5 !text-white">
        <Typography className="!text-[10px] !font-bold !tracking-[0.12em] !text-indigo-200">
          PERSONALISE YOUR DASHBOARD
        </Typography>
        <Typography className="!mt-1 !text-xl !font-bold">Add Widget</Typography>
      </DialogTitle>
      <DialogContent className="!p-6">
        <Typography className="!mb-4 !text-xs !text-slate-500">
          Add a widget to one of your dashboard categories.
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value)}
          className="!mb-5 !border-b !border-slate-200"
        >
          {tabs.map((tab) => <Tab key={tab} label={tab} className="!min-w-0 !px-3 !text-xs" />)}
        </Tabs>

        <div className="space-y-4">
          <FormControl fullWidth size="small">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={selectedCategory}
              label="Category"
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              {categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
            </Select>
          </FormControl>

          <form className="flex gap-2" onSubmit={createCategory}>
            <TextField
              fullWidth
              size="small"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="Create a custom category"
              disabled={categories.length >= 5}
            />
            <Button
              type="submit"
              variant="outlined"
              disabled={categories.length >= 5 || !categoryName.trim()}
              className="!shrink-0 !text-xs"
            >
              Add category
            </Button>
          </form>
          <Typography className="!mt-1 !block !text-[10px] !leading-4 !text-slate-400">
            {categories.length} of 5 categories used
          </Typography>

          <form className="space-y-4" onSubmit={submit}>
            <TextField
              fullWidth
              size="small"
              label="Widget name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter widget name"
              required
            />
            <TextField
              fullWidth
              multiline
              minRows={3}
              size="small"
              label="Widget text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Enter a short description"
            />
            <Button type="submit" variant="contained" className="!bg-indigo-950 !text-xs hover:!bg-indigo-800">
              Add widget
            </Button>
          </form>

          <div className="border-t border-slate-200 pt-4">
            <Typography className="!mb-2 !text-xs !font-bold !text-slate-700">
              {category?.name} widgets
            </Typography>
            {pendingWidgets.map((widget) => (
              <div
                key={widget.id}
                className="my-2 flex items-center justify-between rounded border border-slate-200 px-3 py-1"
              >
                <FormControlLabel
                  className="!m-0"
                  control={
                    <Checkbox
                      size="small"
                      checked={isWidgetSelected(widget.id)}
                      onChange={() => toggleWidget(widget.id)}
                    />
                  }
                  label={<span className="text-[11px] text-slate-600">{widget.name}</span>}
                />
                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    onRemove(selectedCategory, widget.id)
                    setSelectedWidgets((current) => current.filter((id) => id !== widget.id))
                  }}
                  className="!text-[10px]"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
      <DialogActions className="!border-t !border-slate-200 !px-6 !py-4">
        <Button onClick={onClose} variant="outlined" className="!text-xs">Cancel</Button>
        <Button onClick={onClose} variant="contained" className="!bg-indigo-950 !text-xs hover:!bg-indigo-800">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}
