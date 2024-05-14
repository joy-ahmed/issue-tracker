import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const NewIssuePage = () => {
  return (
    <div className="p-5 max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-5">Add New Issue</h1>
      <form className="grid w-full items-center gap-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" placeholder="what is the issue?" />
        <Label htmlFor="message">Define the issue:</Label>
        <Textarea placeholder="Type your issues details here." id="message" />
        <Button className="bg-emerald-500 hover:bg-emerald-600">Submit</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
