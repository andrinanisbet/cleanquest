import { useSelector } from "react-redux";

//Array for levels minimum points and the level titles
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

    export default function getUserLevel(currentPoints = 0) {

        let level = 0;

        for (let i=0; i < Levels.length; i++) {
            if (currentPoints >= Levels[i].min) {
                level = i;
            }
        }

        const currentLevelMin = Levels[level].min;
        const nextLevel = Levels[level + 1];

        const progress = nextLevel
            ? ((currentPoints - currentLevelMin) / (nextLevel.min - currentLevelMin)) * 100
            : 100;

        const pointsToNextLevel = nextLevel
            ? nextLevel.min - currentPoints
            : 0;
        
        return {
            level,
            title: Levels[level].title,
            progress,
            points: currentPoints,
            pointsToNextLevel,
        };
    }