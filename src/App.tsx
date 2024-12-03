import { useState } from 'react';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { generateClient } from 'aws-amplify/api';
import type {Schema} from '../amplify/data/resource';
import './App.css';

Amplify.configure(outputs);

const client = generateClient<Schema>();



function App() {
  const [text, setText] = useState("")

  const postToDo = async () =>{
    
    const promise  = await client.models.Todo.create({
      content: {text}
    });
    console.log('ToDo created:', promise);
    try {
      await promise;
    } catch (error) {
      console.log(error);
      // If the error is because the request was cancelled you can confirm here.
      if (client.isCancelError(error)) {
        console.log(error.message); // "my message for cancellation"
        // handle user cancellation logic
      }
    }
  }


  return (
    <>
    <input name="myInput" onChange={t=>setText(t.target.value)}/>
     <button onClick={postToDo}>
        Submit
     </button>
    </>
  )
}

export default App
