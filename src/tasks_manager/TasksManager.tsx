import type React from "react";
import type { Task } from "../types";
import {TasksList} from "./TasksList";
import { Stack } from "@mui/system"
import { Checkbox, FormControlLabel, Box, Typography } from "@mui/material"
import { useState } from "react"
import { TaskIsDoneDialog } from "./TaskIsDoneDialog"

interface TasksManagerProps {

}

export const TasksManager: React.FC<TasksManagerProps>  = ({}) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Задача 1',
      priority: 'Low',
      isdone: false,
    },
    {
      id: 2,
      title: 'Задача 2',
      priority: 'Normal',
      isdone: false,
    },
    {
      id: 3,
      title: 'Задача 3',
      priority: 'high',
      isdone: false,
    },
    {
      id: 4,
      title: 'Задача 4',
      priority: 'Normal',
      isdone: true,
    },
    {
      id: 5,
      title: 'Задача 5',
      priority: 'high',
      isdone: false,
    },
  ])
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<boolean>(false);
  const filteredTasks=(!searchQuery)?
    tasks : tasks.filter(task => task.isdone !== searchQuery);
  const [openDialog, setOpenDialog] = useState(false);
  const selectedTask = tasks.find(task => task.id === selectedTaskId)

 
    return (
      <Stack direction="row" spacing={2} width="80vw">
        <TaskIsDoneDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}          
          onIsDone={(isdoneTask) => setTasks(prev => 
            prev.map(task => task.id === selectedTaskId ? { ...isdoneTask } : task)
        )}
          selectedTask={selectedTask!}
        />
        <Box width="50%">
          <FormControlLabel   //фильтр отображения только не выполненых задач
          control={
            <Checkbox
              checked={searchQuery}
              onChange={(e) => setSearchQuery(e.target.checked)}
              />
          }
          label="Только не выполненные задачи"
          />
          <TasksList
            tasks={filteredTasks} //{tasks}
            onAddTask={(newTask) => setTasks([...tasks, newTask])}
            selectedTaskId={selectedTaskId}
            onSelectTask={(id) => setSelectedTaskId(id)}
          />
        </Box>
        <Box width="50%">
           {selectedTaskId !== null ? (
          <Stack
            direction="column" spacing={2}
            sx={{"&:hover": {
              bgcolor: "rgba(129, 205, 248, 0.25)",
              cursor: "pointer"
            }
          }}
          onClick={() => setOpenDialog(true)}
          >
            <Typography variant="h4">
              {tasks.find(task => task.id === selectedTaskId)?.title}
            </Typography>
            <Typography variant="h6">
              {tasks.find(task => task.id === selectedTaskId)?.priority}
            </Typography>
            <Typography variant="body1">
              {tasks.find(task => task.id === selectedTaskId)?.isdone 
                ? "Выполнено!" 
                : "Не выполнено!"
              }
            </Typography>
          </Stack>
          ) : (
          <Typography variant="h6">Выберите задачу</Typography>
        )
      }
        </Box>
    </Stack>
    )
}
