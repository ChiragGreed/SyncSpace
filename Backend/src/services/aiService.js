import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { Config } from "../config/config.js";

const taskSchema = z.object({
    tasks: z.array(
        z.object({
            title: z.string(),
            description: z.string()
        })
    )
});

const model = new ChatGoogleGenerativeAI({
    apiKey: Config.GOOGLE_API_KEY,
    model: "gemini-3.6-flash",
    temperature: 0.3,
    maxOutputTokens: 1500
});

const structuredModel = model.withStructuredOutput(taskSchema);

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are an experienced software project manager.

Your job is to analyze a software project and generate practical development tasks.

Rules:
- Generate exactly 4 tasks.
- Tasks must be specific, actionable, and relevant to the project.
- Base tasks strictly on the project title and description.
- Do not invent technologies, frameworks, libraries, databases, payment providers, or architecture that are not mentioned or clearly implied by the project description.
- If the project description mentions specific technologies, use those technologies when relevant.
- Do not assume PostgreSQL, MySQL, MongoDB, Stripe, Firebase, AWS, or any other specific technology unless it is provided in the project information.
- Keep task titles concise.
- Keep task descriptions under 20 words.
- Do not include explanations outside the requested structure.`
    ],
    [
        "human",
        `Project Title:
{title}

Project Description:
{description}

Generate development tasks for this project.`
    ]
]);

const taskGenerationChain = prompt.pipe(structuredModel);

export const generateProjectTasks = async ({ title, description }) => {
    return await taskGenerationChain.invoke({
        title,
        description
    });
};
