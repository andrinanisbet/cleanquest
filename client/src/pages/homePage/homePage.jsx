// import HomeProgressBar from "./HomePageProgressBar"
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { useSelector } from 'react-redux'


export default function Home() {
    const currentUser = useSelector((state) => state.auth.currentUser)
return (
<> 
<h1>Home</h1>
<ProgressBar progressValue={currentUser.points}/>
</>
);
};
