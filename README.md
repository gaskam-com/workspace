# Workspace

### To sort workspace:

Before, you need to create a .env file in the root of the project with the following content:
``` env
GITHUB_ACCESS_TOKEN= your_github_access_token
GITHUB_USERNAME= your_github_username
GITHUB_TYPE= user | org
GITHUB_TARGET= your_github_target
```

Or you can run the deploy.sh script to deploy the project:

```bash
./deploy.sh
```
    
Then, you can run the following command:

```bash
bun run sorting
```
