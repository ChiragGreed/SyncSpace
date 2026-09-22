import { generateProjectTasks } from "../services/aiService.js";

export const generateTasks = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title?.trim()) {
            return res.status(400).json({
                message: "Project title is required",
                success: false
            });
        }

        if (!description?.trim()) {
            return res.status(400).json({
                message: "Project description is required",
                success: false
            });
        }

        const result = await generateProjectTasks({
            title: title.trim(),
            description: description.trim()
        });

        return res.status(200).json({
            message: "Tasks generated successfully",
            success: true,
            tasks: result.tasks
        });
    } catch (err) {
        next(err);
    }
};
