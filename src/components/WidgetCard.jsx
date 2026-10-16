import React from 'react'
import { IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { X } from 'lucide-react'
import WidgetChart from './WidgetChart'

export default function WidgetCard({ widget, categoryId, onRemove }) {
  return (
    <Paper className="min-h-[218px] rounded-xl !border !border-slate-200 !bg-white p-[17px] !shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <Typography className="!text-xs !font-bold !text-slate-700">{widget.name}</Typography>
        <Tooltip title={`Remove ${widget.name}`}>
          <IconButton
            size="small"
            onClick={() => onRemove(categoryId, widget.id)}
            aria-label={`Remove ${widget.name}`}
            className="!text-slate-400 hover:!bg-red-50 hover:!text-red-500"
          >
            <X size={15} />
          </IconButton>
        </Tooltip>
      </div>
      <WidgetChart type={widget.type} text={widget.text} />
    </Paper>
  )
}
