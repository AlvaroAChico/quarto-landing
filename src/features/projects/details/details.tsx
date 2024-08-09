import React from 'react';
// Importación correcta
import { useParams } from 'react-router-dom';
import {
  AddNewTaskButton,
  AddNewTaskButtonWrapper,
  CircleGreen,
  DataBlock,
  InputAndButton,
  InputSearch,
  InputWrapper,
  SearchIcon,
  SwitchButton,
  TaskBlock,
  TaskList,
  Title,
  ItemTask,
  ItemTaskName,
  ItemTaskDate,
  ItemTaskButtons,
  DeleteButtonWithIcon,
  DeleteIcon,
  CircleOrange,
  ItemTaskNameCircle,
  ArrowRightIcon,
  CompletedButton,
  Check2Icon
} from "./details.styles";
import {
  DetailsContainer,
  BackButton,
  BackButtonBlock,
  InfoAndButtons,
  DateandSwitch,
  Date,
  EditButtonWithIcon,
  EditIcon,
  Switch,
  Info,
  Buttons,
  DeleteButton,
  EditButton,
  StyledDeleteIcon,
  StyledEditIcon,
  NameProject,
  Back,
  DateSpace,
  SwitchContainer
} from './details.styles';
import { useState } from 'react';
import { mockProjects } from '../../../config/mocks/projects';

const Details: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [isActive, setIsActive] = useState(false);

    const project = mockProjects.find(p => p.id === id);

    if (!project) {
        return <div>Proyecto no encontrado</div>;
    }

    const handleToggle = () => {
        setIsActive(prevState => !prevState);
    };

    return (
        <DetailsContainer>
            <DataBlock>
                <BackButtonBlock>
                    <BackButton><Back />Back</BackButton>
                </BackButtonBlock>
                <InfoAndButtons>
                    <Info><CircleGreen /> <NameProject>{project.name}</NameProject></Info>
                    <Buttons>
                        <EditButton>Edit<StyledEditIcon /></EditButton>
                        <DeleteButton>Delete <StyledDeleteIcon /></DeleteButton>
                    </Buttons>
                </InfoAndButtons>
                <DateandSwitch>
                    <DateSpace>
                        <Date>Start date: {project.startDate.toLocaleDateString()}</Date>
                        <Date>End date: {project.endDate.toLocaleDateString()}</Date>
                    </DateSpace>
                    <SwitchContainer onClick={handleToggle}>
                        <Switch isActive={isActive}>
                            <SwitchButton isActive={isActive} />
                        </Switch>
                    </SwitchContainer>
                </DateandSwitch>
            </DataBlock>
            <TaskBlock>
                <Title>Search task</Title>
                <InputAndButton>
                    <InputWrapper>
                        <InputSearch placeholder="Search " />
                        <SearchIcon />
                    </InputWrapper>
                    <AddNewTaskButtonWrapper>
                        <AddNewTaskButton>Add New Task</AddNewTaskButton>
                    </AddNewTaskButtonWrapper>
                </InputAndButton>
            </TaskBlock>
            <TaskList>
                {project.tasks.map((task, index) => (
                    <ItemTask key={index}>
                        <ItemTaskNameCircle>
                        <CircleOrange/>
                        <ItemTaskName>{task.name}</ItemTaskName>
                        </ItemTaskNameCircle>
                        
                        <ItemTaskDate>
    <span>{task.startDate.toLocaleDateString()}</span>
    <ArrowRightIcon /> {/* Utiliza el icono como separador */}
    <span>{task.endDate.toLocaleDateString()}</span>
  </ItemTaskDate>
                        <ItemTaskButtons>
                            <CompletedButton>Mark as completed <Check2Icon/> </CompletedButton>
                                <EditButtonWithIcon>
                                    <EditIcon />
                                </EditButtonWithIcon>
                                <DeleteButtonWithIcon>
                                    <DeleteIcon />
                                </DeleteButtonWithIcon>
                        </ItemTaskButtons>
                    </ItemTask>
                ))}
            </TaskList>
        </DetailsContainer>
    );
};

export default Details;
