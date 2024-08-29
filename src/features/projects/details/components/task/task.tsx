import React from "react"
import {
  ContainerTasks,
  HeaderTask,
  TaskTitle,
  NewTaskButton,
  FilterContainer,
  DateButton,
  FilterButton,
  CalendarIconStyled,
  SearchIconStyled,
  ArrowDropDownIconStyled,
  TrashIconStyled,
  DownloadIconStyled,
  FilterRow,
  ContainerFilterTask,
  FilterRowLeft,
  FilterRowRight,
  TableHeader,
  TaskContainer,
  TaskRow,
} from "./task.styles"

const DetailsTask: React.FC = () => {
  const today = new Date().toLocaleDateString()

  // Simulando una lista de tareas
  const tasks = Array.from({ length: 10 }, (_, index) => ({
    task: `Task ${index + 1}`,
    category: "Category",
    contractor: "Contractor",
    status: "Status",
    completion: "Completion",
    dueDate: "DueDate",
  }))
  return (
    <ContainerTasks>
      <HeaderTask>
        <TaskTitle>Tasks</TaskTitle>
        <NewTaskButton>
          <CalendarIconStyled size={20} />
          <span>New Task</span>
        </NewTaskButton>
      </HeaderTask>

      <ContainerFilterTask>
        <FilterRow>
          <FilterRowLeft>
            <DateButton>
              <CalendarIconStyled size={20} />
              <span>Today</span>
              <span>{today}</span>
            </DateButton>
          </FilterRowLeft>
          <FilterRowRight>
            <FilterButton>
              <SearchIconStyled size={20} />
            </FilterButton>
            <FilterButton>
              <span>Filter</span>
              <ArrowDropDownIconStyled size={20} />
            </FilterButton>
            <FilterButton>
              <span>Month</span>
              <ArrowDropDownIconStyled size={20} />
            </FilterButton>
            <FilterButton>
              <TrashIconStyled size={20} />
            </FilterButton>
            <FilterButton>
              <DownloadIconStyled size={20} />
            </FilterButton>
          </FilterRowRight>
        </FilterRow>
        <FilterContainer>
          <TableHeader>
            <div>Task</div>
            <div>Category</div>
            <div>Contractor</div>
            <div>Status</div>
            <div>Completion</div>
            <div>DueDate</div>
          </TableHeader>
          <TaskContainer>
            {tasks.map((task, index) => (
              <TaskRow key={index}>
                <div>{task.task}</div>
                <div>{task.category}</div>
                <div>{task.contractor}</div>
                <div>{task.status}</div>
                <div>{task.completion}</div>
                <div>{task.dueDate}</div>
              </TaskRow>
            ))}
          </TaskContainer>
        </FilterContainer>
      </ContainerFilterTask>
    </ContainerTasks>
  )
}

export default DetailsTask
