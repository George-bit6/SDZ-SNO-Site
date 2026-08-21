import supabase from "../../supabase";



export default class ScoutMember {

    constructor(scout_id='N/A', 
                subgrp_id='N/A',
                unit_name='N/A',
                fname = 'N/A', 
                lname='N/A', 
                city='N/A', 
                country='N/A', 
                phone_nb='N/A', 
                gender='N/A', 
                birthdate='N/A', 
                date_of_membership='N/A', 
                unit_title='N/A'){

        this.Scout_id = scout_id;
        this.subgrp_id = subgrp_id;
        this.unit_name = unit_name;
        this.Fname = fname;
        this.Lname = lname;
        this.city = city;
        this.country = country;
        this.phone_nb = phone_nb;
        this.gender = gender;
        this.birthdate = birthdate;
        this.date_of_membership = date_of_membership;
        this.unit_title = unit_title;
                    
    }

    async getMemberById(member_id){
        const { data: memberData, error } = await supabase
            .from('Scout_members')
            .select('*')
            .eq('Scout_id', member_id)
            .single();

        if (error || !memberData) {
            console.error('Error fetching member:', error);
            return null;
        }

        return new ScoutMember(
            memberData.Scout_id,
            memberData.subgrp_id,
            memberData.unit_name,
            memberData.Fname,
            memberData.Lname,
            memberData.city,
            memberData.country,
            memberData.phone_nb,
            memberData.gender,
            memberData.birthdate,
            memberData.date_of_membership,
            memberData.unit_title
        );

    }

    async getMemberTaskScore(){
        const { data, error } = await supabase
            .rpc('get_member_task_score', { member_id: this.scout_id });

        if (error) {
            console.error('Error fetching member task scores:', error);
            return null;
        }

        return data;
    }

    member_initials() {
        const firstInitial = this.Fname ? this.Fname.charAt(0).toUpperCase() : '';
        const lastInitial = this.Lname ? this.Lname.charAt(0).toUpperCase() : '';
        return firstInitial + lastInitial;
    }

    async getTasks(){

        const { data, error } = await supabase
        .rpc('get_member_tasks', { member_id: this.Scout_id });

        if (error) {
            console.error('Error fetching member tasks:', error);
            return null;
        }

        return data;

    }

    getMemberName(){
        return `${this.Fname} ${this.Lname}`;
    }


}