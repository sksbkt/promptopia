import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {

    try {
        await connectToDb();
        const prompts = await Prompt.find({}).populate('creator');
        console.log('prompts', prompts);

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
}