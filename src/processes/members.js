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
                membership_date='N/A', 
                unit_title='N/A'){

        this.scout_id = scout_id;
        this.subgrp_id = subgrp_id;
        this.unit_name = unit_name;
        this.fname = fname;
        this.lname = lname;
        this.city = city;
        this.country = country;
        this.phone_nb = phone_nb;
        this.gender = gender;
        this.birthdate = birthdate;
        this.membership_date = membership_date;
        this.unit_title = unit_title;
                    
    }

    async getMemberById(member_id){
        const { data, error } = await supabase
            .from('scout_members')
            .select('*')
            .eq('scout_id', member_id)
            .single();

        if (error) {
            console.error('Error fetching member:', error);
            return null;
        }

        return new ScoutMember(
            data.scout_id,
            data.subgrp_id,
            data.unit_name,
            data.fname,
            data.lname,
            data.city,
            data.country,
            data.phone_nb,
            data.gender,
            data.birthdate,
            data.membership_date,
            data.unit_title
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

    member_intials() {
        const firstInitial = this.fname ? this.fname.charAt(0).toUpperCase() : '';
        const lastInitial = this.lname ? this.lname.charAt(0).toUpperCase() : '';
        return firstInitial + lastInitial;
    }



}