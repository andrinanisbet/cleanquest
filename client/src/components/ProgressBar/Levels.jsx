import { useSelector } from "react-redux";

const Levels = [
            {min: 0, title: "Eco Beginner 🌱"},
            {min: 100, title: "Eco Cleaner 🍃"},
            {min: 200, title: "Planet Protector 🌏"},
            {min: 300, title: "Eco Legend 🪴"},
            {min: 400, title: "Environment Hero 🌟"},
            {min: 500, title: "Clean-up Legend ♻️"},
            {min: 600, title: "Eco Master 🌲"},
            {min: 700, title: "Eco Champion 🌳"},
            {min: 800, title: "Cleanup Champion 🌿"},
            {min: 900, title: "Cleaning Legend 🏆"},
            {min: 1000, title: "Cleanquest Hero 🥇"}
        ];

    export default function getUserLevel() {
        const currentUser = useSelector((state) => state.auth.currentUser);

        const currentPoints = currentUser.points; 

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
        const {level, title } = getLevel(currentPoints);
        const progress = currentPoints % 100;


        return {
            level,
            title,
            progress,
            points: currentPoints
        };
    }