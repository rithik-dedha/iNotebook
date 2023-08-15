import React from 'react'


const About = () => {
  return (
    // we are using .state because we passed two params state and update, if it was only 1 param then we didn't had to use .state 
    // <div>This is About {a.state.name} and he is in class {a.state.class}</div>

    <div>This is About page: 
         In this application you can save, edit and delete your notes. You can access this from anywhere. Show this to your friends and family
         Make sure to use it regularly and wisely.
         And also, spread the word.</div>
  )
}

export default About