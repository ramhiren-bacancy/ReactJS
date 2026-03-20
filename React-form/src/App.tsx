import './App.css'
import Form from './configdriven/Form'
import ClassComponent  from './classbase/ClassComponent'
import {jobApplicationConfig}  from './configdriven/jobApplicationConfig.js'
import { formConfig} from './configdriven/FormConfig.js'


function App() {

  return (
    <>
    <h1 className='underline'> React JS Form</h1>
    {/* <Form/> */}
     {/* <Practices/> */}
     <Form config={formConfig} />
     {/* <ClassComponent/> */}
    </>
  )
}

export default App
