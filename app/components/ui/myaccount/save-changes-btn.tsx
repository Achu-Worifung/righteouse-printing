'use client';
import { Button } from "../button";
export function SaveChangesBtn({text, onClick}: {text: string, onClick: ()=>void}) {

    return (
        <Button onClick={onClick} className="col-2 bg-[#1c3144] text-white  cursor-pointer rounded-none py-2">
            {text}
        </Button>
    )
}