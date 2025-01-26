const fs = require("fs");
require("dotenv").config();

const fetchUsers = async () => {
    const ENDPOINT =
        `https://api.devfolio.co/api/hackathons/iwoc3/participants?limit=500&order=DESC&page=1&status=accept_sent,accept,check_in,reimburse,reject_sent,reject,rsvp,submit,waitlist_sent,waitlist,withdraw&role=hacker&user=${process.env.DEVFOLIO_USER_TOKEN}`;

    try {
        const res = await fetch(ENDPOINT, {
            headers: {
                "cookie": "devfolio_user=" + process.env.DEVFOLIO_USER_COOKIE
            }
        });
    
        const json = await res.json();
    
        const users = json.result.map((user) => [
            user.user.username,
            user.user.first_name + " " + user.user.last_name,
            user.user.email,
            user.user.phone_number
        ]);
    
        return users;
    } catch (err) {
        console.log("An error occurred while fetching users from devfolio!");
        console.error(err);
        return [];
    }
};

const appendUsersGithub = async (users) => {
    const ENDPOINT =
        "https://api.devfolio.co/api/hackathons/iwoc3/participants";

    try {
        const userData = await Promise.all(
            users.map(async (user) => {
                const username = user[0];
                const url = `${ENDPOINT}/${username}?user_hackathon_extra_attributes=uuid,value`;
                const res = await fetch(url, {
                    headers: {
                        "cookie": "devfolio_user=" + process.env.DEVFOLIO_USER_COOKIE
                    }
                });

                if (!res.ok)
                    throw new Error(`Error fetching user profile for ${username}`);
    
                const json = await res.json();
    
                let githubURL = json.user_hackathon_extras[0]?.value; // The extra GitHub field value from the form
                if (!githubURL) {
                    console.log(`GitHub URL not found for ${username}`);
                    return [];
                    // githubURL = "https://github.com";
                }
    
                return [
                    user[1],
                    githubURL,
                    user[2],
                    user[3]
                ];
            })
        );

        return userData;
    } catch (err) {
        console.log("An error occurred while fetching user profile from devfolio!");
        console.error(err);
        return [];
    }
};

const exportToCsv = (users, filename) => {
    if (users.length === 0) {
        console.log("No users to export!");
        return;
    }

    const csv = users.filter(user => user.length > 0).map(user => user.join(",")).join("\n");

    fs.writeFileSync(filename, csv);
};

const main = async () => {
    const users = await fetchUsers();
    const usersWithGithub = await appendUsersGithub(users);

    exportToCsv(usersWithGithub, "config/sample.csv");
}

main();
