import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

const Skills = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Software Engineer skills
            </p>
          </div>

          <Separator className="my-4" />
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex space-x-4 text-sm">
              <div className="border-r  pr-4">
                <h4 className="whitespace-nowrap">Programming Languages</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-yellow-400 text-black">JavaScript</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Python</Badge>
                </div>
              </div>
            </div>

            <Separator orientation="vertical" />
            <div className="flex items-center space-x-4 text-sm">
              <div className="border-r pr-4">
                <h4>Frontend</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge>React</Badge>
                  <Badge>NextJS</Badge>
                  <Badge>React Native</Badge>
                  <Badge>Tailwind</Badge>
                  <Badge>Styled-Components</Badge>
                </div>
              </div>
            </div>

            <Separator orientation="vertical" />
            <div className="flex space-x-4 text-sm">
              <div className="border-r pr-4">
                <h4>Backend</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className="bg-green-500">NodeJS</Badge>
                  <Badge>Express</Badge>
                  <Badge>PostgreSQL</Badge>
                  <Badge>Prisma</Badge>
                  <Badge>Django</Badge>
                  <Badge>OpenAI API</Badge>
                  <Badge>Supabase</Badge>
                </div>
              </div>
            </div>

            <Separator orientation="vertical" />
            <div className="flex space-x-4 text-sm">
              <div className="border-r pr-4">
                <h4>DevOps</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge>Vercel</Badge>
                  <Badge>Netlify</Badge>
                  <Badge>Heroku</Badge>
                  <Badge>AWS</Badge>
                </div>
              </div>
            </div>

            <Separator orientation="vertical" />
            <div className="flex space-x-4 text-sm">
              <div className="pr-4">
                <h4>Tools</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge>Git</Badge>
                  <Badge>Github</Badge>
                  <Badge>Figma</Badge>
                  <Badge>Agile</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Skills;
