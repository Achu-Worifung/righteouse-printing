'use client';
import { Button } from "../button";
export function SaveChangesBtn({text, onClick, disabled}: {text: string, onClick: ()=>void, disabled?: boolean}) {

    return (
        <Button 
            onClick={onClick} 
            disabled={disabled}
        className="col-span-2 md:col-span-1 md:col-start-2 hover:bg-[#7a020e] text-white cursor-pointer bg-[#570009] rounded-none py-2"
        >
            {text}
        </Button>
    )
}