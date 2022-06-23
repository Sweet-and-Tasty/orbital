import { useNavigate } from 'react-router-dom';

import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const history = useNavigate();
  function addMeetupHandler(meetupData) {
    fetch(
      'https://react-getting-started-a4afb-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(() => {
      // can use async await
      history.replace('/');
    });
  }

  return (
    <section>
      <h1>Add New Course/ Class</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
}

export default NewMeetupPage;
