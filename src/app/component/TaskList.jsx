import { Fieldset, CheckboxGroup, Checkbox, For} from "@chakra-ui/react";


export default function TaskList([props]){
return <Fieldset.Root >
        <CheckboxGroup >
          <Fieldset.Legend fontSize={"2xl"} fontWeight={"semibold"} display={"flex"} justifyContent={"center"}>
              {props.tasksTitle}
          </Fieldset.Legend>
          <Fieldset.Content >
            <For each={props.taskList}>
              {(task) => (
                <Checkbox.Root key={task} value={task} >
                  <Checkbox.HiddenInput/>
                  <Checkbox.Control/>
                  <Checkbox.Label>{task}</Checkbox.Label>
                </Checkbox.Root>
              )}
            </For>
          </Fieldset.Content>
        </CheckboxGroup>

      </Fieldset.Root>
}