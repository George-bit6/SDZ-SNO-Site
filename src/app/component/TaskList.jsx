import { Heading, CheckboxGroup, Checkbox, For, VStack, Button} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../supabase-client";

const checkboxStyles = {

  colorPalette: 'red',
  variant: "solid",

}

export default function TaskList(){
  
  const [taskList, setTaskList] = useState([]);

  const fetchTasks = async () => {

  let { data, error } = await supabase
    .from('scouts_guides_group_tasks')
    .select('*')

    if(error){

      console.error("Error Occured while fetching data: " + error);
    }
    else{
      const taskData = data.map((task) => {
        return {
          id: task.id,
          descriptiton: task.task_desc,
          type: task.task_type,
          isCompleted: task.is_completede
        }
      });
      setTaskList(taskData);
      
    }    
  }
  useEffect(() => {
    
    fetchTasks();
    
  }, [])


return <VStack>
        <CheckboxGroup >
          <Heading>{taskList.type}</Heading>
            <For each={taskList}>
              {(task) => (      
                <Checkbox.Root {...checkboxStyles} key={task.id} value={task.id}>
                  <Checkbox.HiddenInput/>
                  <Checkbox.Control/>
                  <Checkbox.Label>{task.descriptiton}</Checkbox.Label>
                </Checkbox.Root>
              )}
            </For>
        </CheckboxGroup>
      </VStack>
}