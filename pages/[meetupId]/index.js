import {MongoClient , ObjectId} from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail'
import Layout from "../../components/layout/Layout";

function MeetupDetails(props){
    return (<Layout><MeetupDetail image={props.meetupData.image} 
                          title={props.meetupData.title}
                          address={props.meetupData.address}
                          description={props.meetupData.description}
    /></Layout>)
} 

export async function getStaticPaths(){
    const client=await MongoClient.connect('mongodb+srv://gokul-vell:49wkMIEyrLsjRLhL@cluster0.qpqrvgo.mongodb.net/meetups?retryWrites=true&w=majority')
    const db= client.db();
    const meetupsCollection=db.collection('meetups');
    const meetups=await meetupsCollection.find({}, {_id: 1}).toArray();
    client.close();
    return {
        fallback: false,
        paths:meetups.map(meet => ({
            params:{meetupId : meet._id.toString()}
        }))
        }
}

export async function getStaticProps(context){
    const meetupId=context.params.meetupId;

    const client=await MongoClient.connect('mongodb+srv://gokul-vell:49wkMIEyrLsjRLhL@cluster0.qpqrvgo.mongodb.net/meetups?retryWrites=true&w=majority')
    const db= client.db();
    const meetupsCollection=db.collection('meetups');
    const selectedMeet= await meetupsCollection.findOne({_id:
        new ObjectId(meetupId)})
    client.close();
    return {
        props:{
            meetupData: {id: selectedMeet._id.toString(),
                         title:selectedMeet.title,
                         address:selectedMeet.address,
                        image: selectedMeet.image,
                        description:selectedMeet.description,
                    }
        }
    }
}

export default MeetupDetails