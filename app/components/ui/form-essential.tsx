import { CircleQuestionMark } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from '@/components/ui/button';


export function RequiredIndicator() {
  return <span className="text-red-500 ml-1">*</span>;
}

export function InfoIndcator({message}: {message: string}) {
  return (
   <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" type='button'><CircleQuestionMark /></Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{message}</p>
      </TooltipContent>
    </Tooltip>)
}