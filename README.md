# Feed Chat (BETA)

Transform your RSS feed into a cutting-edge QA chatbot and amplify the interactivity of your blog posts. 

Powered by Langchain (https://github.com/hwchase17/langchainjs) and OpenAI API (https://openai.com).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fakshay5995%2Ffeed-chat&env=OPENAI_API_KEY,OPEN_API_MAX_TOKENS,RSS_DOMAIN,RSS_PATH&project-name=feed-chat&repository-name=feed-chat&demo-title=Feed%20Chat&demo-description=Feed%20chat%20allow%20you%20to%20give%20an%20interface%20to%20your%20blog%20users%20to%20ask%20questions%20and%20interact%20with%20your%20blog%20posts%20in%20QA%20style.%20Powered%20by%20Langchain%20and%20OpenAI.&demo-url=https%3A%2F%2Fchat.rocketeer.dev)


## Demo

[https://chat.rocketeer.dev/](https://chat.rocketeer.dev/)

### Screenshot

![Screenshot](https://raw.githubusercontent.com/akshay5995/feed-chat/main/docs/screenshot.png)

### Get started

Add the following env variables to your `.env` file:

```sh
RSS_DOMAIN=yourdomain.com
RSS_PATH=rss.xml # without leading slash
OPENAI_API_KEY=your-open-ai-api-key
OPENAI_MAX_TOKENS=number-of-tokens
CONTENT_X_PATH=article # Optional default is article tag
# Optional
OPENAPI_ORG=your-openapi-org
```

### Run locally

```sh
yarn dev
```

### Deploy

```sh
yarn build
yarn start
```

### Limitations

Current I'm using in memory cache to store the questions and answers. This is not a good solution for production. I'm planning Supabase to store the vectors and questions.
