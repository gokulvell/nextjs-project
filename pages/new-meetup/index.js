import NewMeetupForm from '../../components/meetups/NewMeetupForm'
import Layout from '../../components/layout/Layout'


function NewMeetupPage(){

    async function addMettupHandler(enteredData){
        // console.log(enteredData)
        const response= await fetch('/api/new-meetup',{
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })  
        const data= await response.json();
        console.log(data); 
    }

    
    return <Layout>
        <NewMeetupForm onAddMeetup={addMettupHandler}/>
    </Layout>
}

export default NewMeetupPage;