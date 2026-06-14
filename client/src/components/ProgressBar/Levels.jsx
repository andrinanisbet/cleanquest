import { useSelector } from "react-redux";

const Levels = [
            {min: 0, title: "Eco Beginner 🌱"},
            {min: 100, title: "Green Explorer 🍃"},
            {min: 200, title: "Planet Protector 🌏"},
            {min: 300, title: "Enviromental Legend🪴"}
        ];
export default function getUserLevel() {
        const currentUser = useSelector((state) => state.auth.currentUser)
        const currentPoints = currentUser.points; 
        const {level, title } = getlevel(points);
        const progress = currentPoints % 100;

        function getLevel(points) {
            let level = 0;
            for (let i = 0; i < Levels.length; i++) {
                if (points >= Levels[i].min) {
                    level = i
                }
            }
            return {
                level,
                title: Levels[level].title
            };
        }
    };