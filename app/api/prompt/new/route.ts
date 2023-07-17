import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDb();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        });
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response('Failed to create prompt', { status: 500 });
    }
}