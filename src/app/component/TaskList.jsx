import { Fieldset, CheckboxGroup, Checkbox, For, VStack} from "@chakra-ui/react";


export default function TaskList({tasksTitle = "Title Not Added", taskList = []}){
return <VStack>
      <Fieldset.Root >
        <CheckboxGroup >
          <Fieldset.Legend margin={"4"} fontSize={"2xl"} fontWeight={"semibold"} display={"flex"} justifyContent={"center"}>
              {tasksTitle}
          </Fieldset.Legend>
          <Fieldset.Content >
            <For each={taskList}>
              {(task) => (
                <Checkbox.Root colorPalette={"red"} variant={"solid"} key={task} value={task}>
                  <Checkbox.HiddenInput/>
                  <Checkbox.Control/>
                  <Checkbox.Label>{task}</Checkbox.Label>
                </Checkbox.Root>
              )}
            </For>
          </Fieldset.Content>
        </CheckboxGroup>

      </Fieldset.Root>
      </VStack>
}