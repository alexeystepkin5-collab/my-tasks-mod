import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { TasksManager } from './tasks_manager/TasksManager'
//import type { Task } from './types'
 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TasksManager />
  </StrictMode>,
)
