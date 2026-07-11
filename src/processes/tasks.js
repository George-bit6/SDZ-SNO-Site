import supabase from "../../supabase";

class Task {
    constructor(
        task_name = 'N/A',
        subgrp_id = null,
        level_name = 'N/A',
        task_desc = 'N/A',
        points = 0,
        task_type = 'N/A'
    ) {
        this.task_name = task_name;
        this.subgrp_id = subgrp_id;
        this.level_name = level_name;
        this.task_name = task_name;
        this.task_desc = task_desc;
        this.points = points;
        this.task_type = task_type;
    }

    async getTask(subgrp_id, level_name, task_name) {
        const { data, error } = await supabase
            .from('Tasks')
            .select('*')
            .eq('task_name', task_name)
            .eq('subgrp_id', subgrp_id)
            .eq('level_name',  level_name)
            .single();

        if (error || !data) {
            console.error('Error fetching task:', error);
            return null;
        }

        return new Task(
            
            data.subgrp_id,
            data.level_name,
            data.task_name,
            data.task_desc,
            data.points,

            data.task_type
        );
    }

    async getTasksBySubgroupAndLevel(subgrp_id, level_name) {
        const { data, error } = await supabase
            .from('Tasks')
            .select('*')
            .eq('subgrp_id', subgrp_id)
            .eq('level_name', level_name);

        if (error) {
            console.error('Error fetching tasks:', error);
            return [];
        }

        return data.map(task => new Task(
            task.task_name,
            task.subgrp_id,
            task.level_name,
            task.task_desc,
            task.points,
            task.task_type
        ));
    }

    async getTasksBySubgroup(subgrp_id) {
        const { data, error } = await supabase
            .from('Tasks')
            .select('*')
            .eq('subgrp_id', subgrp_id);

        if (error) {
            console.error('Error fetching tasks:', error);
            return [];
        }

        return data.map(task => new Task(
            task.task_name,
            task.subgrp_id,
            task.level_name,
            task.task_desc,
            task.points,
            task.task_type
        ));
    }

    async getAllTasks() {
        const { data, error } = await supabase
            .from('Tasks')
            .select('*');

        if (error) {
            console.error('Error fetching tasks:', error);
            return [];
        }

        return data.map(task => new Task(
            task.task_name,
            task.subgrp_id,
            task.level_name,
            task.task_desc,
            task.points,
            task.task_type
        ));
    }

    async getTaskByName(task_name) {
        const { data, error } = await supabase
            .from('Tasks')
            .select('*')
            .eq('task_name', task_name)
            .single();

        if (error || !data) {
            console.error('Error fetching task by name:', error);
            return null;
        }

        return new Task(
            data.task_name,
            data.subgrp_id,
            data.level_name,
            data.task_desc,
            data.points,
            data.task_type
        );
    }


    getSubgroupId() {
        return this.subgrp_id;
    }

    getLevelName() {
        return this.level_name;
    }

    getTaskName() {
        return this.task_name;
    }

    getTaskDesc() {
        return this.task_desc;
    }

    getPoints() {
        return this.points;
    }


    getTaskType() {
        return this.task_type;
    }

    addTaskToDatabase() {
        return supabase
            .from('Tasks')
            .insert([{
                task_name: this.task_name,
                subgrp_id: this.subgrp_id,
                level_name: this.level_name,
                task_desc: this.task_desc,
                points: this.points,
                task_type: this.task_type
            }]);
    }
}

export default Task;