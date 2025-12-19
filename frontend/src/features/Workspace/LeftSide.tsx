import { ProblemDisplayer } from "../ProblemDisplayer/ProblemDisplayer"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import type { Problem } from "@/types/Problem"

export function LeftSide({ problem }: { problem?: Problem }) {
  return (
    <div className="flex-1 bg-card">
      <Tabs defaultValue="statement">
        <div className="bg-muted">
          <TabsList>
            <TabsTrigger value="statement">Statement</TabsTrigger>
            <TabsTrigger value="submissions">Tests</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent className="mt-0 overflow-y-auto" value="statement">
          <ProblemDisplayer problem={problem}/>
        </TabsContent>
        <TabsContent value="tests">
          
        </TabsContent>
      </Tabs>
    </div>
    
  )
}