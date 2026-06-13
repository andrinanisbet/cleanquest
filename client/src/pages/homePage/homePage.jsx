import ProgressBar from "../../components/ProgressBar/ProgressBar";
import HomeProgressBar from "./HomePageProgressBar"

export default function Home() {
return (
<> 
<h1>Home</h1>
<div className="user-card">
<ProgressBar progressValue={props.user.points}/>
</div>
</>
);
}
