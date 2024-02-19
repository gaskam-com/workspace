import { $ } from "bun";

let token = "";
let username = "";
let type = "";
let target = "";

const path = "./.env";
const file = Bun.file(path);
const exists = await file.exists();

async function ask(): Promise<void> {
    const prompt: [string, string, string, string] = [
        "Your Github acces token: ",
        "Your Github username: ",
        "The Github target account type -> user | org: ",
        "The Github target account: ",
    ];
    process.stdout.write(prompt[0]);
    for await (const line of console) {
        token = line;
        break;
    }
    process.stdout.write(prompt[1]);
    for await (const line of console) {
        username = line;
        break;
    }
    process.stdout.write(prompt[2]);
    for await (const line of console) {
        if (line === "org") {
            target = line;
            break;
        } else if (line === "user") {
            target = line;
            break;
        } else {
            console.log("Invalid type. Please enter 'user' or 'org'.");
            process.stdout.write(prompt[2]);
        }
    }
    process.stdout.write(prompt[3]);
    for await (const line of console) {
        type = line;
        break;
    }
}

async function edit(
    token: string,
    username: string,
    type: string,
    target: string
): Promise<void> {
    const prompt: [string, string, string, string] = [
        `Your Github acces token (${token}): `,
        `Your Github username (${username}): `,
        `The Github target account type (${type}): `,
        `The Github target account (${target}): `,
    ];
    process.stdout.write(prompt[0]);
    for await (const line of console) {
        if (line === "") {
            break;
        } else {
            token = line;
            break;
        }
    }
    process.stdout.write(prompt[1]);
    for await (const line of console) {
        if (line === "") {
            break;
        } else {
            username = line;
            break;
        }
    }
    process.stdout.write(prompt[2]);
    for await (const line of console) {
        if (line === "") {
            break;
        } else if (line === "org") {
            target = line;
            break;
        } else if (line === "user") {
            target = line;
            break;
        } else {
            console.log("Invalid type. Please enter 'user' or 'org'.");
            process.stdout.write(prompt[2]);
        }
    }
    process.stdout.write(prompt[3]);
    for await (const line of console) {
        if (line === "") {
            break;
        } else {
            type = line;
            break;
        }
    }
}

if (exists) {
    if (
        process.env.GITHUB_ACCESS_TOKEN &&
        process.env.GITHUB_USERNAME &&
        process.env.GITHUB_TYPE &&
        process.env.GITHUB_TARGET
    ) {
        token = process.env.GITHUB_ACCESS_TOKEN;
        username = process.env.GITHUB_USERNAME;
        type = process.env.GITHUB_TYPE;
        target = process.env.GITHUB_TARGET;

        await edit(token, username, type, target);

        const confirm = "Is this information correct? (Y/n): ";
        process.stdout.write(confirm);
        for await (const line of console) {
            if (line === "") {
                break;
            } else if (line === "Y" || line === "y") {
                break;
            } else if (line === "N" || line === "n") {
                await ask();
                process.stdout.write(confirm);
            } else {
                console.log("Invalid input. Please enter 'y' or 'n'.");
                process.stdout.write(confirm);
            }
        }
    } else {
        await ask();

        const confirm = "Is this information correct? (Y/n): ";
        process.stdout.write(confirm);
        for await (const line of console) {
            if (line === "") {
                break;
            } else if (line === "Y" || line === "y") {
                break;
            } else if (line === "N" || line === "n") {
                await ask();
                process.stdout.write(confirm);
            } else {
                console.log("Invalid input. Please enter 'y' or 'n'.");
                process.stdout.write(confirm);
            }
        }

        Bun.write(
            path,
            `GITHUB_ACCESS_TOKEN=${token}\nGITHUB_USERNAME=${username}\nGITHUB_TYPE=${type}\nGITHUB_TARGET=${target}\n`
        );
    }
} else {
    await ask();

    const confirm = "Is this information correct? (Y/n): ";
    process.stdout.write(confirm);
    for await (const line of console) {
        if (line === "") {
            break;
        } else if (line === "Y" || line === "y") {
            break;
        } else if (line === "N" || line === "n") {
            await ask();
            process.stdout.write(confirm);
        } else {
            console.log("Invalid input. Please enter 'y' or 'n'.");
            process.stdout.write(confirm);
        }
    }

    Bun.write(
        path,
        `GITHUB_ACCESS_TOKEN=${token}\nGITHUB_USERNAME=${username}\nGITHUB_TYPE=${type}\nGITHUB_TARGET=${target}\n`
    );
}

process.env.GITHUB_ACCESS_TOKEN = token;
process.env.GITHUB_USERNAME = username;
process.env.GITHUB_TYPE = type;
process.env.GITHUB_TARGET = target;

console.log(await $`bun run sorting`);