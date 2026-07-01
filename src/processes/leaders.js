import supabase from '../../supabase.js'

export default class Leader {

    constructor(leader_id='N/A',
                leader_title='N/A',
                date_of_role_acquisition='N/A'){
        // Store the leader's main identifier.
        this.leader_id = leader_id;

        // Turn the incoming title value into a list of titles so one leader can have more than one.
        const titles = Array.isArray(leader_title)
            ? leader_title
            : [leader_title].filter((title) => title != null && title !== '');

        // Keep all titles in one array, and fall back to a placeholder if none are found.
        this.leader_titles = titles.length > 0 ? titles : ['N/A'];
        // Keep the first title available for older code that expects a single title value.
        this.leader_title = this.leader_titles[0];
        this.date_of_role_acquisition = date_of_role_acquisition;
    }

    async getLeaderById(leader_id) {
        // Ask Supabase for every record that matches this leader ID.
        const { data, error } = await supabase
            .from('leaders')
            .select('*')
            .eq('leader_id', leader_id);

        if (error) {
            // Report the problem if the database request fails.
            console.error('Error fetching leader:', error);
            return null;
        }

        // If no matching leader was found, stop here.
        if (!data?.length) {
            return null;
        }

        // Pull all non-empty titles from the returned rows.
        const titles = data
            .map((row) => row.leader_title)
            .filter((title) => title != null && title !== '');

        // Create a Leader object using the collected titles.
        return new Leader(
            data[0].leader_id,
            titles.length > 0 ? titles : 'N/A',
            data[0].date_of_role_acquisition
        );
    }

    

}
