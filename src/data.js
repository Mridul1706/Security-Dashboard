export const dashboardData = [
  {
    id: 'cspm',
    name: 'CSPM Executive Dashboard',
    widgets: [
      {
        id: 'cloud-accounts',
        name: 'Cloud Accounts',
        type: 'accounts',
        text: 'Connected cloud accounts',
      },
      {
        id: 'risk-assessment',
        name: 'Cloud Account Risk Assessment',
        type: 'risk',
        text: 'Risk assessment overview',
      },
    ],
  },
  {
    id: 'cwpp',
    name: 'CWPP Dashboard',
    widgets: [
      {
        id: 'namespace-alerts',
        name: 'Top 5 Namespace Specific Alerts',
        type: 'empty',
        text: 'Namespace alerts',
      },
      {
        id: 'workload-alerts',
        name: 'Workload Alerts',
        type: 'empty',
        text: 'Workload alerts',
      },
    ],
  },
  {
    id: 'registry',
    name: 'Registry Scan',
    widgets: [
      {
        id: 'image-risk',
        name: 'Image Risk Assessment',
        type: 'bar',
        text: 'Image vulnerabilities',
      },
      {
        id: 'image-issues',
        name: 'Image Security Issues',
        type: 'bar',
        text: 'Image security issues',
      },
    ],
  },
  {
    id: 'ticket',
    name: 'Ticket Dashboard',
    widgets: [
      {
        id: 'open-tickets',
        name: 'Open Tickets',
        type: 'empty',
        text: 'Tickets requiring attention',
      },
    ],
  },
]
