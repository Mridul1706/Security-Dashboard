# CNAPP Dashboard

A React dashboard built with Vite, React, Material UI, Tailwind CSS, Zustand, and Recharts.

## Run locally

1. Install Node.js 18 or newer.
2. Open a terminal in this project folder.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal.

## Features

- Dashboard sections and widgets are loaded from `src/data.js`.
- Add a widget with a name and description from the **Add Widget** dialog.
- Create custom categories from the same dialog, with a maximum of five categories.
- Remove widgets with the cross button on each widget.
- Search all widget names from the top search field.
- Widget state is managed locally with Zustand.
- Donut and bar widgets use Recharts.
- Material UI provides the dialog, form controls, buttons, and accessible interactive elements.
- Tailwind CSS provides the page layout and styling.
