const access_token = Bun.env.GITHUB_ACCESS_TOKEN;
const username = Bun.env.GITHUB_USERNAME;
const type: "org" | "user" = Bun.env.GITHUB_TYPE as "org" | "user";
const target = Bun.env.GITHUB_TARGET;

import { $ } from "bun";
import { join, resolve } from "node:path";

fetch(`https://api.github.com/search/repositories?q=${type}:${target}`, {
    headers: {
        Authorization: `token ${access_token}`,
    },
})
    .then((response) => response.json())
    .then((data: any) => data.items)
    .then(async (data) => {
        // @ts-ignore
        const sortedRepos = data.sort((a, b) => {
            const dateA = new Date(a.pushed_at).getTime();
            const dateB = new Date(b.pushed_at).getTime();
            return dateB - dateA;
        });

        const repoNames: string[] = sortedRepos.map((repo: { name: string }) => `../${repo.name}/`);
        const workspacePath = "./github-gaskam.code-workspace";

        // Check if all the repos are cloned
        repoNames.forEach(async (path) => {
            console.log(await $`git clone https://${username}:${access_token}@github.com/gaskam-com/${path.split("/")[1]}.git`.cwd(resolve(join(__dirname, "../"))).text());
        });
        
        const file = Bun.file(workspacePath);
        const content: { folders: { path:string }[] } = await file.json();
        content.folders = content.folders.filter((folder) => !repoNames.includes(folder.path));
        content.folders.unshift(...repoNames.map((path) => ({ path })));
        
        Bun.write(workspacePath, JSON.stringify(content, null, 4));
    })
    .catch((error) => {
        console.error(error);
    });

