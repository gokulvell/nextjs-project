import MeetupList from '../components/meetups/MeetupList'
import Layout from '../components/layout/Layout'
import { MongoClient } from 'mongodb'


export default function HomePage(props) {
  
    return <Layout>
        <MeetupList meetups={props.meetups}/>
    </Layout>
  
}

export async function getStaticProps(){
  const client=await MongoClient.connect('mongodb+srv://gokul-vell:49wkMIEyrLsjRLhL@cluster0.qpqrvgo.mongodb.net/meetups?retryWrites=true&w=majority')
  const db= client.db();
  const meetupsCollection=db.collection('meetups');    
  const meetups= await meetupsCollection.find().toArray();
  client.close();
    return {
      props:{
        meetups: meetups.map(meet => ({
          title: meet.title,
          address: meet.address,
          image: meet.image,
          id: meet._id.toString(),
        }))
      },
      revalidate: 1
    }
}

