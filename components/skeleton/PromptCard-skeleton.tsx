import React from "react";
import Image from "next/image"


function PromptCard_skeleton() {
    return <div
        className="mt-16 prompt_layout"
    >
        {

            <div
                className="prompt_card flex justify-center items-center gap-1"
                style={{ minHeight: "158px" }}
            >
                <p
                    className="font-inter text-sm blue_gradient cursor-pointer animate-pulse"
                >Loading</p>
            </div>

        }

    </div>

}



export default PromptCard_skeleton;
