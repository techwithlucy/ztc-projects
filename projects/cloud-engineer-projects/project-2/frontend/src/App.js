import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from './Components/login';
import Register from './Components/register';
import Course from './Components/course';
import Courses from './Components/Courses';
import Profile from './Components/profile';
import Learnings from './Components/learnings';
import Home from './Components/Home';
import AddCourse from './Components/AddCourse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Components/DashBoard/Dashboard';
import 'boxicons/css/boxicons.min.css';
import EditCourse from './Components/EditCourses';
import DUsers from './Components/DashBoard/DUsers';
import DCourses from './Components/DashBoard/DCourses';
import Assessment from './Components/Assessment';
import ErrorPage from './Components/ErrorPage';
import AddQuestions from './Components/AddQuestions';
import Performance from './Components/DashBoard/Performance';
import DTutors from './Components/DashBoard/DTutors';
import certificate from './Components/certificate';
import Forum from './Components/forum';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/addquestions/:id" element={<AddQuestions/>}/>
          <Route path='/dashboard' Component={Dashboard}></Route>
          <Route path='/login' Component={Login}></Route>
          <Route path='/register' Component={Register}></Route>
          <Route path='/' Component={Home}></Route>
          <Route path='/courses' Component={Courses}></Route>
          <Route path='/course/:id' Component={Course}></Route>
          <Route path='/discussion/:id' Component={Forum}></Route>
          <Route path='/certificate/:id' Component={certificate}></Route>
          <Route path='/assessment/:id' Component={Assessment}></Route>
          <Route path='/addcourse' Component={AddCourse}></Route>
          <Route path='/editCourse/:id' Component={EditCourse}></Route>
          <Route path='/profile' Component={Profile}></Route>
          <Route path='/Learnings' Component={Learnings}></Route>
          <Route path='/Dcourses' Component={DCourses}></Route>
          <Route path='/Dusers' Component={DUsers}></Route>
          <Route path='/Dtutors' Component={DTutors}></Route>
          <Route path='/Performance' Component={Performance} />
          <Route path='*' Component={ErrorPage}></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
