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
        //function to find the users level
        //loops through each level threshhold from level 0 and updates level if user has enough points
        //sets level with index
        function getLevel(points) {
            let level = 0;
            for (let i = 0; i < Levels.length; i++) {
                if (points >= Levels[i].min) {
                    level = i
                }
            }

            // returns level and corresponding title for when user points were more than level minimum
            return {
                level,
                title: Levels[level].title
            };
        }
        //has users current level and level title info
        const {level, title } = getLevel(currentPoints);
        // calculates progress no next level & resets bar for each level
        const progress = currentPoints % 100;

        // return users level info
        return {
            level,
            title,
            progress,
            points: currentPoints
        };
    }