'use client';
import { Button } from "../button";
export function SaveChangesBtn({text, onClick, disabled}: {text: string, onClick: ()=>void, disabled?: boolean}) {

    return (
        <Button 
            onClick={onClick} 
            disabled={disabled}
        className="col-span-2 md:col-span-1 md:col-start-2 bg-burgundy text-white hover:bg-hoverprimary hover:text-hovertext cursor-pointer rounded-none py-2"
        >
            {text}
        </Button>
    )
}