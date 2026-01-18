'use client';
import { Button } from "../button";
export function SaveChangesBtn({text, onClick, disabled}: {text: string, onClick: ()=>void, disabled?: boolean}) {

    return (
        <Button 
            onClick={onClick} 
            disabled={disabled}
            className="col-2 bg-[#1c3144] text-white  cursor-pointer rounded-none py-2"
        >
            {text}
        </Button>
    )
}