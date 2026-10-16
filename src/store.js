import { create } from 'zustand'
import { dashboardData } from './data'

export const useDashboardStore = create((set) => ({
  categories: dashboardData,
  addCategory: (id, name) =>
    set((state) => {
      if (
        state.categories.length >= 5 ||
        state.categories.some((category) => category.name.toLowerCase() === name.toLowerCase())
      ) {
        return state
      }

      return {
        categories: [
          ...state.categories,
          {
            id,
            name,
            isCustom: true,
            widgets: [],
          },
        ],
      }
    }),
  removeCategory: (categoryId) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== categoryId || !category.isCustom),
    })),
  addWidget: (categoryId, widget) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, widget] }
          : category,
      ),
    })),
  removeWidget: (categoryId, widgetId) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter((widget) => widget.id !== widgetId),
            }
          : category,
      ),
    })),
}))
