import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

//* GET
export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } },
    res: NextResponse) => {



    try {
        await connectToDb();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt)
            return new Response("prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}

//* PATCH

export const PATCH = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectToDb();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt)
            return new Response("prompt not found", { status: 404 });

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });

    } catch (error) {
        return new Response(error, { status: 500 });
    }
}
//* DELETE

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        await connectToDb();
        await Prompt.findByIdAndRemove(params.id);
        return new Response('Prompt deleted successfully', { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}