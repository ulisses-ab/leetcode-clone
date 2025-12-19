import { Editor } from "@/features/Editor/Editor";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"


export function RightSide({ setupId }: { setupId: string }) {
  return (
    <div className="flex-1 bg-card">
      <Tabs defaultValue="editor">
        <div className="bg-muted">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent className="mt-0" value="editor">
          <Editor persistanceKey={setupId}/>
        </TabsContent>
        <TabsContent value="tests">
          
        </TabsContent>
      </Tabs>
    </div>
  )
}